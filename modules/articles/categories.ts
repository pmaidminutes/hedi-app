import { getServiceClient, gql } from "@/common/graphql";
import { FCategory, FCategoryExpanded, ICategory, ICategoryExpanded } from "@/modules/articles/types";


export async function getCategoryBySlug(pageSlug:string, lang = "de") {
	const query = gql`
		query getCategoryBySlug($slug:String!, $srcLang:String) {
			categoryBySlug(slug:$slug, srcLang:$srcLang) {
				...FCategory
			}
		}
	${FCategory}
	`;
	
	const client = await getServiceClient();
	
	return client
		.request<{categoryBySlug: ICategory}>(query, { srcLang: lang, slug: pageSlug })
		.then((data) => data.categoryBySlug)
		.catch(e => { console.warn(e); return null; });
}

export async function getAllCategories(lang: string = "de") {
	// const query = gql`
	// 	query getAllCategories($langcode:String){
	// 		categories(langcode:$langcode) {
	// 			...FCategory
	// 			categories {
	// 				...FCategory
	// 				articles {
	// 					...FArticle
	// 				}
	// 			}
	// 			articles {
	// 				...FArticle
	// 			}
	// 			id
	// 			name
	// 			path
	// 			parent
	// 			categories {
	// 				id
	// 				name
	// 				path
	// 				parent
	// 				articles {
	// 					id
	// 					title
	// 					path
	// 					category {
	// 						name
	// 					}
	// 					tags {
	// 						id
	// 						name
	// 					}
	// 				}
	// 			}
	// 			articles {
	// 				id
	// 				title
	// 				path
	// 				category {
	// 					id
	// 					name
	// 				}
	// 				tags {
	// 					id
	// 					name
	// 				}
	// 			}
	// 		}
	// 	}
	// `;
	const query = gql`
	 	query getAllCategories($langcode:String) {
	 		categories(langcode:$langcode) {
				...FCategoryExpanded
			}
		}
	${FCategoryExpanded}
	`;

	const client = await getServiceClient();

	return client
		.request<{categories: ICategoryExpanded[]}>(query, { langcode: lang })
		.then((data) => data.categories ?? [])
}
