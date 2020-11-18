import { getServiceClient, gql } from "@/common/graphql";
import { ArticleFrag, IArticle } from "@/modules/articles/types";

export async function getArticleBySlug(pageSlug: string, lang = "de") {
	const query = gql`
		query getArticleBySlug($slug: String!, $srcLang: String) {
			articleBySlug(slug: $slug, srcLang: $srcLang) {
				...ArticleFrag
			}
		}
	${ArticleFrag}
	`;
	const client = await getServiceClient();
	
	return client
		.request<{articleBySlug: IArticle}>(query, { srcLang: lang, slug: pageSlug })
		.then((data) => data.articleBySlug)
		.catch(e => { console.warn(e); return null; });
}
