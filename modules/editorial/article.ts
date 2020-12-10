import { getServiceClient, gql } from "@/common/graphql";
import { ITranslatable, IURLPath, URLPathFrag } from "@/common/model/cms";
import { ISegmentPath } from "@/common/types";
import { ArticleFrag, IArticle } from "@/modules/editorial/types";

export async function getArticlePaths(lang = "de"): Promise<ISegmentPath[]> {
  const query = gql`
    query getArticlePaths($langcode: String) {
      articles(langcode: $langcode) {
        ...URLPathFrag
        langcode
      }
    }
    ${URLPathFrag}
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const articles: (IURLPath & ITranslatable)[] = await client
    .request(query, { langcode: lang })
    .then(data => data.articles)
    .catch(e => console.warn("error", e));

  return articles.map(a => ({
    params: { segments: a.urlsegments },
    locale: a.langcode,
  }));
}

export async function getArticleBySlug(
  pageSlug: string,
  lang = "de",
  excludeSelf = true
) {
  const query = gql`
    query getArticleBySlug(
      $slug: String!
      $srcLang: String
      $dstLang: String
      $excludeSelf: Boolean
    ) {
      articleBySlug(slug: $slug, srcLang: $srcLang, dstLang: $dstLang) {
        ...ArticleFrag
      }
    }
    ${ArticleFrag}
  `;
  const client = await getServiceClient();
  // TODO "under-18-years-and-pregnant" throws an error due to the number
  return client
    .request<{ articleBySlug: IArticle }>(query, {
      srcLang: lang,
      dstLang: lang,
      slug: pageSlug,
      excludeSelf,
    })
    .then(data => data.articleBySlug)
    .catch(e => {
      console.warn(e);
      return null;
    });
}
