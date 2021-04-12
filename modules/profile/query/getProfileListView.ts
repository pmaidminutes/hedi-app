import { gql, serviceGQuery } from "@/modules/graphql";
import { Profile } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { IAppPage } from "@/modules/common/types";
import { AppPagesGQL } from "@/modules/common/query";
import { getProfileList } from "./getProfileList";
import { WithUIElementsFields } from "@/modules/model";
import { logAndFallback, logAndNull } from "@/modules/common/error";

export type ProfileListView = IAppPage & {
  profiles: Profile[];
};

export async function getProfileListView(
  route: string
): Promise<ProfileListView | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getProfileListElements(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      ${AppPagesGQL}
    }
  `;
  const { appPages } = await serviceGQuery<{ appPages: IAppPage[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndFallback(data, { appPages: [] as IAppPage[] }));

  if (!(appPages?.[0] && appPages[0].key === "profiles")) return null;

  const appPage = appPages[0];
  appPage.type = "ProfileList";

  const elementsQuery = gql`
    query getProfileListElements(
      $lang: String!
    ) { 
      elements:appPagesByKey(keys: ["viewprofile"], lang: $lang) { ${WithUIElementsFields} }
  }`;

  const [profiles, { elements }] = await Promise.all([
    getProfileList(lang ?? "de"),
    serviceGQuery<{ elements: IAppPage[] }>(elementsQuery, {
      lang,
    }).then(data => logAndFallback(data, { elements: [] as IAppPage[] })),
  ]);

  appPage.elements = elements?.[0].elements ?? [];

  return { ...appPage, profiles };
}
