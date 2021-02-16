import { getServiceClient, gql } from "@/modules/graphql";
import { PageFields, IPage } from "../types";

export async function getPage(
  route: string,
  lang = "de"
): Promise<IPage | null> {
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
