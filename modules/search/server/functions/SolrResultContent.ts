import { IContentEntry } from "../../types";

export function transformSolrResultToContentEntry(
  entity: any,
  lang: string,
  highlightingContent: any
): IContentEntry {
  const prefix = "tm_X3b_" + lang;
  const title = prefix + "_title";
  const body = prefix + "_body";
  return {
    contentTitle: entity[title],
    contentId: entity.id,
    contentBody: entity[body],
    search_api_id: entity.ss_search_api_id,
    site: entity.site,
    ss_type: entity.ss_type ? entity.ss_type : entity.ss_vid,
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
