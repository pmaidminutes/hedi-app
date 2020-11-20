import { getServiceClient, gql } from "@/common/graphql";
import {
	CategoryFrag,
	CategoryExpandedFrag,
	ICategory,
	ICategoryExpanded,
} from "@/modules/editorial/types";


export async function getCategoryBySlug(pageSlug: string, lang = "de", excludeSelf = true) {
	const query = gql`
		query getCategoryBySlug(
			$slug: String!
			$srcLang: String
			$dstLang: String
			$excludeSelf: Boolean
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
			excludeSelf
		})
		.then((data) => data.categoryBySlug)
		.catch((e) => {
			console.warn(e);
			return null;
		});
}

export async function getAllCategories(lang: string = "de", excludeSelf = true) {
	const query = gql`
	 	query getAllCategories($langcode:String, $excludeSelf:Boolean) {
	 		categories(langcode:$langcode) {
				...CategoryExpandedFrag
			}
		}
		${CategoryExpandedFrag}
	`;

	const client = await getServiceClient();

	return client
		.request<{categories: ICategoryExpanded[]}>(query, { langcode: lang, excludeSelf })
		.then((data) => data.categories ?? [])
}
