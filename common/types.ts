import { ParsedUrlQuery } from "querystring";

export interface ILanguageKey {
  lang: string;
}

export interface ILanguageParam extends ILanguageKey, ParsedUrlQuery {}

export interface IHTTPError {
  code: number;
  text: string;
}
