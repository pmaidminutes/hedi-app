import { request, gql } from "graphql-request";
import { BASE_URL, GQL_PUBLIC } from "../../common/urls";

export async function getCategoryBySlug(slug: string, lang: string = "de") {
	const query = gql`
		{
			categoryBySlug(slug:${`"${slug}"`}, srcLang:${`"${lang}"`}){
				name
				categories{
					name
					path
				}
				articles {
					title
					path
				}
			}
		}
	`;

	const result = await request(BASE_URL + GQL_PUBLIC, query)
		.then((data) => data)
		.catch((e) => console.warn("error", e));
	return result.categoryBySlug;
}

export async function getAllCategories(lang: string = "de") {
	const query = gql`
		{
			categories(langcode: ${`"${lang}"`}) {
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

	const result = await request(BASE_URL + GQL_PUBLIC, query)
		.then((data) => data)
		.catch((e) => console.warn("error", e));
	console.log({ result });
	return result.categories ?? [];
}
