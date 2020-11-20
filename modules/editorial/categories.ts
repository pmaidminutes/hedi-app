import { getServiceClient, gql } from "@/common/graphql";
import {
	CategoryFrag,
	CategoryExpandedFrag,
	ICategory,
	ICategoryExpanded,
} from "@/modules/editorial/types";

export async function getCategoryBySlug(pageSlug: string, lang = "de") {
	const query = gql`
		query getCategoryBySlug(
			$slug: String!
			$srcLang: String
			$dstLang: String
		) {
			categoryBySlug(slug: $slug, srcLang: $srcLang, dstLang: $dstLang) {
				...CategoryFrag
			}
		}
		${CategoryFrag}
	`;

	const client = await getServiceClient();

	return client
		.request<{ categoryBySlug: ICategory }>(query, {
			srcLang: lang,
			dstLang: lang,
			slug: pageSlug,
		})
		.then((data) => data.categoryBySlug)
		.catch((e) => {
			console.warn(e);
			return null;
		});
}

export async function getAllCategories(lang: string = "de") {
	const query = gql`
		query getAllCategories($langcode: String) {
			categories(langcode: $langcode) {
				...CategoryExpandedFrag
			}
		}
		${CategoryExpandedFrag}
	`;

	const client = await getServiceClient();

	return client
		.request<{ categories: ICategoryExpanded[] }>(query, { langcode: lang })
		.then((data) => data.categories ?? []);
}
