import { getServiceClient, gql } from "@/common/graphql";
import { ILocalizedEntity, LocalizedEntityFields } from "@/common/model/cms";
import { routeToSegments } from "@/common/types";
import { ArticleFields, IArticle } from "@/modules/editorial/types";

export async function getArticlePaths(lang = "de") {
  const query = gql`
    query getArticlePaths($lang: String) {
      articles(lang: $lang) { 
        ${LocalizedEntityFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const articles = await client
    .request<{ articles: ILocalizedEntity[] }>(query, { lang })
    .then(data => data.articles)
    .catch(e => {
      console.warn("error", e);
      return null;
    });

  return articles
    ?.map(a => ({
      params: { segments: routeToSegments(a.route) },
      locale: a.lang,
    }))
    .filter(a => a.locale === lang);
}

export async function getArticle(route: string, lang = "de") {
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
