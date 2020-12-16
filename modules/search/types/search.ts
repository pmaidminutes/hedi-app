export interface IContentEntry {
  contentTitle: string;
  contentBody: string;
  contentId: string;
  site: string;
  search_api_id: string;
  highlightedContent: IHighlightedContent;
  ss_type:string;
}

export interface IHighlightedContent {
  contentId: string;
  highlightedTitle: string;
  highlightedBody: string;
}
