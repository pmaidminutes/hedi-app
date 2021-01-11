import { getServiceClient, gql } from "@/modules/graphql";
import { routeToSegments } from "@/modules/common/utils";
import { IEntityLocalized, EntityLocalizedFields } from "@/modules/model";
import { ISegmentPath } from "../../types";

export async function getArticlePaths(
  lang = "de"
): Promise<ISegmentPath[] | undefined> {
  const query = gql`
    query getArticlePaths($lang: String) {
      articles(lang: $lang) { 
        ${EntityLocalizedFields}
      }
    }
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const articles = await client
    .request<{ articles: IEntityLocalized[] }>(query, { lang })
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
