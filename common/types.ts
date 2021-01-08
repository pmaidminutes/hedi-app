import { ParsedUrlQuery } from "querystring";

export interface ISegmentParam extends ParsedUrlQuery {
  segments?: string[];
}

export const routeToSegments = (route?: string) =>
  route ? route.split("/").filter(s => s) : [];

export const segmentsToRoute = (segments: string[]) => "/" + segments.join("/");

export interface ISegmentPath {
  params: ISegmentParam;
  locale: string;
}

export interface IHTTPError {
  code: number;
  text: string;
}
