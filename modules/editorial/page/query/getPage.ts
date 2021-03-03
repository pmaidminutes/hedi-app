import { getServiceClient, gql } from "@/modules/graphql";
import { PageFields, IPage } from "../types";
import { getLangByRoute } from "@/modules/common/utils";

export async function getPage(route: string): Promise<IPage | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getPages(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      pages(routes: $routes, lang: $lang) {
        ${PageFields}
      }
    }
  `;
  const client = await getServiceClient();
  return client
    .request<{ pages: IPage[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => data.pages?.[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
