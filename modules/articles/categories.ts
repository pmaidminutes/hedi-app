import { getServiceClient, gql } from "@/common/graphql";
import { ICategoriesBySlug, ICategory } from "@/modules/articles/types";

export async function getCategoryBySlug(pageSlug:string, lang = "de") {
	const query = gql`
		query getCategoryBySlug($slug:String!, $srcLang:String){
			categoryBySlug(slug:$slug, srcLang:$srcLang){
				name
				categories{
					name
					path
				}
				articles {
					title
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
				name
				path
				parent
				categories {
					id
					name
					path
					parent
					articles {
						id
						title
						path
						category {
							name
						}
						tags {
							id
							name
						}
					}
				}
				articles {
					id
					title
					path
					category {
						id
						name
					}
					tags {
						id
						name
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
