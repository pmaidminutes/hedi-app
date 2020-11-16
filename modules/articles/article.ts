import { getServiceClient, gql } from "@/common/graphql";
import { IArticleBySlug } from "@/modules/articles/types";

export async function getArticleBySlug(pageSlug: string, lang = "de") {
	const query = gql`
		query getArticleBySlug($slug: String!, $srcLang: String) {
			articleBySlug(slug: $slug, srcLang: $srcLang) {
				id
				title
				body
				summary
				tags {
					id
					name
				}
				category {
					id
					name
				}
			}
		}
	`;
	const client = await getServiceClient();
	if (!client) return [];

	return client
		.request<IArticleBySlug>(query, { srcLang: lang, slug: pageSlug })
		.then((data) => data.articleBySlug ?? null)
		.catch((e) => console.warn("error", e));
}
