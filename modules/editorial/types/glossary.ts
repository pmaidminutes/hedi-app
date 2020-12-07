import {
  IEntity,
  IURLPath,
  ITranslatable,
  ITranslations,
  EntityFields,
  TranslatableFields,
  IContent,
  ContentFields,
  SlugFields,
} from "@/common/model/cms";
import { ParsedUrlQuery } from "querystring";
export interface IGlossaryEntry extends IContent {
  translations: IGlossaryEntry[];
}

export interface IGroupGlossary {
  abbrev: string;
  glossaries: IGlossaryEntry[];
}
export const GlossaryPathFields = `
  ${EntityFields}
  ${SlugFields}
`;
export const GlossaryFields = `
${ContentFields}
translations(excludeSelf: $excludeSelf) {
  ${ContentFields}}
`;
export interface IGlossaryUrls extends ParsedUrlQuery {
  glossaryLocalized: string;
  glossaryTerm: string;
}
export interface IGlossaryPaths {
  params: IGlossaryUrls;
  locale: string;
}
