import { ParsedUrlQuery } from "querystring";

export interface ISegmentParam extends ParsedUrlQuery {
  segments?: string[];
}

export interface ISegmentPath {
  params: ISegmentParam;
  locale: string;
}
