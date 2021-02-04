export interface IContentEntry {
  contentTitle: string;
  contentBody: string;
  contentId: string;
  site: string;
  search_api_id: string;
  highlightedContent: IHighlightedContent;
  ss_type: string;
}

export interface IHighlightedContent {
  contentId: string;
  highlightedTitle: string;
  highlightedBody: string | string[];
}

export interface ISuggestEntry {
  term: string;
  weight: number;
}
export interface ICoordinatesJSON {
  items: {
    title: string;
    id: string;
    resultType: string;
    localityType: string;
    position: IGeoJSON;
  }[];
}
export interface IGeoJSON {
  lat: string;
  lng: string;
}
