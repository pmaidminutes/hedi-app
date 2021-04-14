import { gql, serviceGQuery } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";
import { IAppPage } from "@/modules/common/types";
import { AppPagesGQL } from "@/modules/common/query";
import { WithUIElementsFields } from "@/modules/model";
import { logAndFallback } from "@/modules/common/error";

export async function getProfileListDefinition(
  route: string
): Promise<IAppPage | null> {
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

  const { elements } = await serviceGQuery<{ elements: IAppPage[] }>(
    elementsQuery,
    {
      lang,
    }
  ).then(data => logAndFallback(data, { elements: [] as IAppPage[] }));

  appPage.elements = elements?.[0].elements ?? [];

  return appPage;
}
