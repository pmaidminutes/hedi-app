import {
  IEntity,
  IURLPath,
  ITranslatable,
  ITranslations,
  EntityFields,
  TranslatableFields,
} from "@/common/model/cms";
export interface IGlossaryEntry extends IEntity, IURLPath, ITranslatable {
  body: string;
  label: string;
}
export interface IGlossaryItem
  extends IGlossaryEntry,
    ITranslations<IGlossaryEntry> {}

export interface IGlossary {
  abbrev: string;
  glossaries: IGlossaryItem[];
}
export const GlossaryEntryFields = `
  body
  `;

export const GlossaryFields = `
${EntityFields}
${GlossaryEntryFields}
translations(excludeSelf: $excludeSelf) {
  ${TranslatableFields}
  ${EntityFields}
${GlossaryEntryFields}}
`;
