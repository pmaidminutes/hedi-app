import { getServiceClient, gql } from "@/common/graphql";
// Types
import { ISegment, ISegmentParams } from "@/modules/editorial/types";

export async function getAllSegments(lang = "de") {
	const query = gql`
		query getAllLanguages($langcode: String) {
			articles(langcode: $langcode) {
				path
			}
			categories(langcode: $langcode) {
				path
				categories {
					path
				}
			}
		}
	`;

	const client = await getServiceClient();
	if (!client) return [];

	const result:ISegment = await client
		.request(query, { langcode: lang })
		.then((data) => data ?? [])
		.catch((e) => console.warn("error", e));

	const segments: ISegmentParams[] = [];
	// TODO: refactor maybe
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
	return segments;
}

const segmentObject = (segment: string, lang: string): ISegmentParams => ({
	params: {
		segment: segment.split("/").filter((entry) => entry !== ""),
	},
	locale: lang,
});
