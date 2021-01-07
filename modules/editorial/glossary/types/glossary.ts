import {
  BodyFields,
  IBody,
  IEntityLocalized,
  IEntityTranslated,
  EntityTranslatedFields,
} from "@/common/model/cms";

export interface IGlossaryTerm
  extends IEntityTranslated<IEntityLocalized>,
    IBody {}

export const GlossaryTermFields = `${EntityTranslatedFields}
${BodyFields}`;

export interface IGlossaryGroup {
  key: string;
  terms: IGlossaryTerm[];
}

export interface IGlossaryGrouped extends IEntityTranslated<IEntityLocalized> {
  groups: IGlossaryGroup[];
}

export interface IGlossary extends IEntityTranslated<IEntityLocalized> {
  terms: IGlossaryTerm[];
}

export const GlossaryFields = `${EntityTranslatedFields}
terms { ${GlossaryTermFields} }`;
