import { getServiceClient, gql } from "@/common/graphql";
import { IArticleBySlug } from "@/modules/articles/types";

export async function getArticleBySlug(pageSlug: string, lang = "de") {
	const query = gql`
		query getArticleBySlug($slug: String!, $srcLang: String) {
			articleBySlug(slug: $slug, srcLang: $srcLang) {
				pagetype:__typename
				id
				label
				body
				summary
				tags {
					id
					label
				}
				category {
					id
					label
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
