import { ParsedUrlQuery } from "querystring";
import { ILocalizedEntity, ITranslatable } from "./model/cms";

export interface ILanguageKey {
  lang: string;
}

export interface ILanguageParam extends ILanguageKey, ParsedUrlQuery {}

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

export interface ISegmentProps {
  content: ITranslatable<ILocalizedEntity>;
  // HACK: change when colors implemented in drupal
  colorClass: string;
}

export interface IHTTPError {
  code: number;
  text: string;
}
