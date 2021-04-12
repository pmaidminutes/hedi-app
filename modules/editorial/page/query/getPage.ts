import { gql, serviceGQuery } from "@/modules/graphql";
import { PageFields, IPage } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndNull } from "@/modules/common/error";

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
  return serviceGQuery<{ pages: IPage[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.pages?.[0] ?? null);
}
