import { request, gql } from "graphql-request";
import { BASE_URL, GQL_PUBLIC } from "../../common/urls";

export async function getAllSegments(lang = "de") {
	const query = gql`
		{
			articles(langcode: ${`"${lang}"`}) {
				path
			}
			categories(langcode: ${`"${lang}"`}) {
				path
				categories {
					path
				}
			}
		}
  `;
	const result: ISegment = await request(BASE_URL + GQL_PUBLIC, query)
		.then((data) => data)
		.catch((e) => console.warn("error", e));
	const segments: string[] = [];
	result.articles.forEach((article) => segments.push(article.path));
	result.categories.forEach((category) => {
		segments.push(category.path);
		if (category.categories.length > 0) {
			category.categories.forEach((subcategory) =>
				segments.push(subcategory.path)
			);
		}
	});
	return segments;
}
interface ISegment {
	articles: IPath[];
	categories: ICategorySegment[];
}

interface ICategorySegment extends IPath {
	categories: IPath[];
}

interface IPath {
	path: string;
}
