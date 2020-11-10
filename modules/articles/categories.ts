import { request, gql } from "graphql-request";
import { BASE_URL, GQL_PUBLIC } from "../../common/urls";
import { slugifyTitle } from "../../common/utils";

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
	// const segments = addSlug(result.categories);
	return result.categories ?? [];
	// return segments;
}

function addSlug(categories: ICategory[]) {
	return categories.forEach((category) => {
		traverse(category);
	});
}

function traverse(category: ICategory) {
	category["slug"] = slugifyTitle(category.name);

	if (category.categories !== undefined) {
		for (const child of category.categories) {
			const sub = traverse(child);
		}
	}
}

export interface ICategory {
	slug: string;
	id: string;
	name: string;
	parent?: string;
	articles: IArticles[];
	categories: ICategory[];
}

interface IArticles {
	id: string;
	title: string;
}
