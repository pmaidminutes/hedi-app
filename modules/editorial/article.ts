import { getServiceClient, gql } from "@/common/graphql";
import { ArticleFrag, IArticle } from "@/modules/editorial/types";

export async function getArticleBySlug(pageSlug: string, lang = "de", excludeSelf = true) {
	const query = gql`
		query getArticleBySlug($slug: String!, $srcLang: String, $dstLang: String, $excludeSelf: Boolean) {
			articleBySlug(slug: $slug, srcLang: $srcLang, dstLang: $dstLang) {
				...ArticleFrag
			}
		}
		${ArticleFrag}
	`;
	const client = await getServiceClient();

	return client
		.request<{ articleBySlug: IArticle }>(query, {
			srcLang: lang,
			dstLang: lang,
			slug: pageSlug,
			excludeSelf
		})
		.then((data) => data.articleBySlug)
		.catch((e) => {
			console.warn(e);
			return null;
		});
}
