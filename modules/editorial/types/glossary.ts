import { IEntity, IURLPath, ITranslatable, ITranslations, EntityFields, TranslatableFields } from "@/common/model/cms";

export interface IGlossaryEntry extends IEntity, IURLPath, ITranslatable {
    slug:string;
    body:string;
    summary:string;
  }

export interface IGlossary
extends IGlossaryEntry,
  ITranslations<IGlossaryEntry> {
glossaries: IGlossaryEntry[];
translations: IGlossaryEntry[];
}
export const GlossaryFields = `
${EntityFields}
${TranslatableFields}
slug
body
summary
`;