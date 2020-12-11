import {
  ContentFields,
  EntityFields,
  IContent,
  ITranslatable,
  ITypename,
  IURLPath,
  SlugFields,
} from "@/common/model/cms";

export interface IGlossaryEntry extends IContent {
  translations: IGlossaryEntry[];
}

export interface IGlossaryGroup {
  abbrev: string;
  glossaries: IGlossaryEntry[];
}

export interface IGlossary extends ITypename, ITranslatable {
  groups: IGlossaryGroup[];
  translations: (ITranslatable & IURLPath)[];
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
