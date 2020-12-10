import { IContentEntry } from "../types";

export function getSolrContentResult(
  entity: any,
  lang: string,
  highlightingContent: any
): IContentEntry {
  console.log(highlightingContent);
  const prefix = "tm_X3b_" + lang;
  const title = prefix + "_title";
  const body = prefix + "_body";
  return {
    contentTitle: entity[title],
    contentId: entity.id,
    contentBody: entity[body],
    search_api_id: entity.ss_search_api_id,
    site: entity.site,
    highlightedContent: {
      contentId: entity.id,
      highlightedBody:
        highlightingContent[body] === undefined
          ? highlightingContent["voll"]
          : highlightingContent[body],
      highlightedTitle: highlightingContent[title],
    },
  };
}