import {
  BodyFields,
  IBody,
  ILocalizedEntity,
  ITranslatable,
  TranslatableFields,
} from "@/common/model/cms";

export interface IGlossaryTerm extends ITranslatable<ILocalizedEntity>, IBody {}

export const GlossaryTermFields = `${TranslatableFields}
${BodyFields}`;

export interface IGlossaryGroup {
  key: string;
  terms: IGlossaryTerm[];
}

export interface IGroupedGlossary extends ITranslatable<ILocalizedEntity> {
  groups: IGlossaryGroup[];
}

export interface IGlossary extends ITranslatable<ILocalizedEntity> {
  terms: IGlossaryTerm[];
}

export const GlossaryFields = `${TranslatableFields}
terms { ${GlossaryTermFields} }`;
