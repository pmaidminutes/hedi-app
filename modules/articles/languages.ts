import { request, gql } from "graphql-request";
const BASE_URL = "https://appstaging.projekt-hedi.de";
const GQL_PUBLIC = "/gql/public";

export async function getAllLanguages(lang: string = "de") {
	const query = gql`
		{
      {
        languages {
          isDefault
          langcode
          weight
          isDefault
          isRTL
          translatedName(langcode:"de")
        }
      }
		}
	`;

	const result = await request(BASE_URL + GQL_PUBLIC, query)
		.then((data) => data)
		.catch((e) => console.warn("error", e));
	return result.languages ?? [];
}

export interface ILanguage {
	isDefault: boolean;
	langcode: string;
	weight: number;
	isRTL: boolean;
	translatedName: string;
}
