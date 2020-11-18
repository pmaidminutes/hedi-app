import { getServiceClient, gql } from "@/common/graphql";
import { ICategoriesBySlug, ICategory } from "@/modules/articles/types";

export async function getCategoryBySlug(pageSlug:string, lang = "de") {
	const query = gql`
		query getCategoryBySlug($slug:String!, $srcLang:String){
			categoryBySlug(slug:$slug, srcLang:$srcLang){
				pagetype:__typename
				label
				categories{
					pagetype:__typename
					label
					path
				}
				articles {
					pagetype:__typename
					label
					path
					summary
				}
			}
		}
	`;
	const client = await getServiceClient();
	if (!client) return [];

	return client
		.request<ICategoriesBySlug>(query, { srcLang: lang, slug: pageSlug })
		.then((data) => data.categoryBySlug ?? null)
		.catch((e) => console.warn("error", e));
}

export async function getAllCategories(lang: string = "de") {
	const query = gql`
		query getAllCategories($langcode:String){
			categories(langcode:$langcode) {
				id
				label
				path
				parent
				categories {
					id
					label
					path
					parent
					articles {
						id
						label
						path
						category {
							label
						}
						tags {
							id
							label
						}
					}
				}
				articles {
					id
					label
					path
					category {
						id
						label
					}
					tags {
						id
						label
					}
				}
			}
		}
	`;
	const client = await getServiceClient();
	if (!client) return [];

	return client
		.request<ICategory>(query, { langcode: lang })
		.then((data) => data ?? [])
		.catch((e) => console.warn("error", e));
}
