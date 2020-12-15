import { ParsedUrlQuery } from "querystring";
import { ITranslatable, ITypename, IURLPath } from "./model/cms";

export interface ILanguageKey {
  lang: string;
}

export interface ILanguageParam extends ILanguageKey, ParsedUrlQuery {}

export interface ISegmentParam extends ParsedUrlQuery {
  segments?: string[];
}

export interface ISegmentPath {
  params: ISegmentParam;
  locale: string;
}

export interface ISegmentProps {
  content: ITypename & { translations: (ITranslatable & IURLPath)[] };
  // HACK: change when colors implemented in drupal
  colorClass: string;
}

export interface IHTTPError {
  code: number;
  text: string;
}
