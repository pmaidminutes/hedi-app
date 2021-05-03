import { gql, serviceGQuery } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";

import { logAndNull } from "@/modules/common/error";
import { IPage, PageGQL } from "../../types";

export async function getPage(route: string): Promise<IPage | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getPage(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      pages(routes: $routes, lang: $lang) {
        ${PageGQL}
      }
    }
  `;
  const page = await serviceGQuery<{ pages: IPage[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.pages?.[0] ?? null);

  return page;
}
