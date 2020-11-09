import { request, gql } from "graphql-request";
import { BASE_URL, GQL_PUBLIC } from "../../common/urls";

export async function getAllCategoryData(lang: string = "de") {
	const query = gql`
		{
			categories(langcode: ${`"${lang}"`}) {
				id
				name
				articles {
					id
					title
				}
				categories {
					id
					name
					parent
					articles {
						id
						title
					}
				}
			}
		}
	`;

	const result = await request(BASE_URL + GQL_PUBLIC, query)
		.then((data) => data)
		.catch((e) => console.warn("error", e));
	return (await result?.categories) ?? [];
}

export interface ICategories {
	id: string;
	name: string;
	parent?: string;
	articles: IArticles[];
	categories: ICategories[];
}

interface IArticles {
	id: string;
	title: string;
}
