import { getServiceClient, gql, GQLEndpoint } from "@/modules/graphql";
import { Profile } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { IAppPage } from "@/modules/common/types";
import { AppPagesGQL } from "@/modules/common/query";
import { getProfileList } from "./getProfileList";
import { WithUIElementsFields } from "@/modules/model";

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
  const client = await getServiceClient(GQLEndpoint.Internal);
  const { appPages } = await client
    .request<{ appPages: IAppPage[] }>(query, {
      routes: [route],
      lang,
    })
    .catch(e => {
      console.warn(e);
      return { appPages: [] };
    });

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
    getProfileList(lang ?? "de", client),
    client.request<{ elements: IAppPage[] }>(elementsQuery, { lang }),
  ]);

  appPage.elements = elements?.[0].elements ?? [];

  return { ...appPage, profiles };
}
