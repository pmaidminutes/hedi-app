import { getServiceClient, gql } from "@/common/graphql";
import { ITranslatable, IURLPath, URLPathFrag } from "@/common/model/cms";
// Types
import { IEditorialParams } from "./generators/editorial";

export async function getAllEditorialSegments(lang = "de") {
  const query = gql`
    query getAllLanguages($langcode: String) {
      articles(langcode: $langcode) {
        ...URLPathFrag
        langcode
      }
      categories(langcode: $langcode) {
        ...URLPathFrag
        langcode
        categories {
          ...URLPathFrag
          langcode
        }
      }
    }
    ${URLPathFrag}
  `;

  const client = await getServiceClient();
  if (!client) return [];

  const result: IEditorial = await client
    .request(query, { langcode: lang })
    .then(data => data)
    .catch(e => console.warn("error", e));

  return getParamObjects(result, lang);
}

function getParamObjects(obj: any, lang: string) {
  const result: IEditorialParams[] = [];
  for (let key in obj) {
    if (typeof key === "string" && key === "urlsegments") {
      if (obj.langcode === lang) {
        result.push(editorialSegmentObject(obj[key], lang));
      }
    } else if (typeof obj[key] === "object") {
      result.push(...getParamObjects(obj[key], lang));
    }
  }
  return result;
}

const editorialSegmentObject = (
  segments: string[],
  lang: string
): IEditorialParams => ({
  params: {
    editorial: segments,
  },
  locale: lang,
});

interface IEditorial {
  articles: (IURLPath & ITranslatable)[];
  categories: ICategorySegment[];
}

interface ICategorySegment extends IURLPath, ITranslatable {
  categories: (IURLPath & ITranslatable)[];
}
