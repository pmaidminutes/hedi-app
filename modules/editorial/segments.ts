import { getServiceClient, gql } from "@/common/graphql";
// Types
import { IEditorialParams } from "./generators/editorial";

export async function getAllEditorialSegments(lang = "de") {
	const query = gql`
		query getAllLanguages($langcode: String) {
			articles(langcode: $langcode) {
				urlpath
			}
			categories(langcode: $langcode) {
				urlpath
				categories {
					urlpath
				}
			}
		}
	`;

	const client = await getServiceClient();
	if (!client) return [];

	const result:IEditorial = await client
		.request(query, { langcode: lang })
		.then((data) => data)
		.catch((e) => console.warn("error", e));

	return getParamObjects(result, lang);
}

function getParamObjects(obj: any, lang: string) {
	const result: IEditorialParams[] = [];
	for (let key in obj) {
		if (typeof key === "string" && key === 'path') {
			result.push(editorialSegmentObject(obj[key], lang));
		} else {
			result.push(...getParamObjects(obj[key], lang));
		}
	}
	return result
}

const editorialSegmentObject = (segment: string, lang: string): IEditorialParams => ({
	params: {
		editorial: segment.split("/").filter((entry) => entry !== ""),
	},
	locale: lang,
});


interface IEditorial {
	articles: IPath[];
	categories: ICategorySegment[];
}


interface ICategorySegment extends IPath {
	categories: IPath[];
}

interface IPath {
	path: string;
}