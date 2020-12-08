import {
  ContentFields,
  EntityFields,
  IContent,
  SlugFields,
} from "@/common/model/cms";
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
