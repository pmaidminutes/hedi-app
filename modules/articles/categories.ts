import { request, gql } from "graphql-request";
import { BASE_URL, GQL_PUBLIC } from "../../common/urls";

export async function getAllSegments(lang: string = "de") {
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
	console.log({result})
	return result.categories ?? [];
}
interface ICategoryBasic {
	id: number;
	name: string;
}

export interface ICategory extends ICategoryBasic {
	id: number;
	path: string;
	parent?: string;
	articles: IArticle[];
	categories: ICategory[];
}

interface IArticle {
	id: number;
	title: string;
	path: string;
	category: ICategoryBasic;
	tags: ITag;
}

interface ITag {
	id: number;
	name: string;
}
