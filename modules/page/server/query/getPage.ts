import { gql, serviceGQuery } from "@/modules/graphql";
import { getLangByRoute } from "@/modules/common/utils";

import { logAndFallback, logAndNull } from "@/modules/common/error";
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

export async function getPageById(
  lang: string,
  pageId: string
): Promise<IPage> {
  const query = gql`
    query getPageById($lang: String!, $includeSelf: Boolean, $pageId:String!){
      pagesById(ids:[$pageId], lang:$lang){
        ${PageGQL}
      }
    }
  `;

  const { pagesById } = await serviceGQuery<{ pagesById: IPage[] }>(query, {
    lang,
    pageId,
  }).then(data => logAndFallback(data, { pagesById: [] as IPage[] }));

  if (pagesById.length < 1)
    throw new Error("Error while fetching Profile Page data");
  return pagesById[0];
}
