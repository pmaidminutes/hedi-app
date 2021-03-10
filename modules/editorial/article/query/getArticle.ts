import { getServiceClient, gql } from "@/modules/graphql";
import { ArticleFields, IArticle } from "../types";
import { getLangByRoute } from "@/modules/common/utils";

export async function getArticle(route: string): Promise<IArticle | null> {
  const lang = getLangByRoute(route);

  const query = gql`
    query getArticles(
      $routes: [String!]!
      $lang: String!
      $includeSelf: Boolean
    ) {
      articles(routes: $routes, lang: $lang) {
        ${ArticleFields}
      }
    }
  `;
  const client = await getServiceClient();
  return client
    .request<{ articles: IArticle[] }>(query, {
      routes: [route],
      lang,
    })
    .then(data => data.articles?.[0])
    .catch(e => {
      console.warn(e);
      return null;
    });
}
