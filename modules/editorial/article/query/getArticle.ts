import { getServiceClient, gql } from "@/common/graphql";
import { ArticleFields, IArticle } from "../types";

export async function getArticle(
  route: string,
  lang = "de"
): Promise<IArticle | null> {
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
