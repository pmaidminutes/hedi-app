import { gql, serviceGQuery } from "@/modules/graphql";
import { ArticleGQL, IArticle } from "../types";
import { getLangByRoute } from "@/modules/common/utils";
import { logAndNull } from "@/modules/common/error";

export async function getArticle(route: string): Promise<IArticle | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getArticles(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      articles(routes: $routes, lang: $lang) {
        ${ArticleGQL}
      }
    }
  `;
  return serviceGQuery<{ articles: IArticle[] }>(query, {
    routes: [route],
    lang,
  }).then(data => logAndNull(data)?.articles[0] ?? null);
}
