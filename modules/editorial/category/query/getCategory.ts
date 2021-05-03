import { gql, serviceGQuery } from "@/modules/graphql";
import { ICategory, CategoryFields } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndNull } from "@/modules/common/error";

export async function getCategory(route: string): Promise<ICategory | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getCategories(
      $routes: [String!]!
      $lang: String
      $includeSelf: Boolean
    ) {
      categories(routes: $routes, lang: $lang) {
        ${CategoryFields}
      }
    }
  `;

  return serviceGQuery<{ categories: ICategory[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.categories[0] ?? null);
}
