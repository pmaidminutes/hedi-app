export interface IContentEntry {
  contentTitle: string;
  contentBody: string;
  contentId: string;
  site: string;
  search_api_id: string;
  highlightedContent: IHighlightedContent;
}

export interface IHighlightedContent {
  contentId: string;
  highlightedTitle: string;
  highlightedBody: string;
}
