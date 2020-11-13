import { request, gql } from "graphql-request";
import { BASE_URL, GQL_PUBLIC } from "../../common/urls";

// Types
import { ISegment, ISegmentParams } from "./types";

export async function getAllSegments(lang = "de") {
	console.log("getAllSegments");
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
	const segments: ISegmentParams[] = [];
	result.articles.forEach((article) =>
		segments.push(segmentObject(article.path, lang))
	);
	result.categories.forEach((category) => {
		segments.push(segmentObject(category.path, lang));
		if (category.categories.length > 0) {
			category.categories.forEach((subcategory) =>
				segments.push(segmentObject(subcategory.path, lang))
			);
		}
	});
	console.log({segments})
	return segments;
}

const segmentObject = (segment: string, lang: string): ISegmentParams => ({
	params: {
		segment: segment.split("/").filter((entry) => entry !== "")
	},
	locale: lang,
});
