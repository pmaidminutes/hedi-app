import {
  BodyFields,
  IBody,
  IEntityLocalized,
  ITranslatable,
  TranslatableFields,
} from "@/common/model/cms";

export interface IGlossaryTerm extends ITranslatable<IEntityLocalized>, IBody {}

export const GlossaryTermFields = `${TranslatableFields}
${BodyFields}`;

export interface IGlossaryGroup {
  key: string;
  terms: IGlossaryTerm[];
}

export interface IGroupedGlossary extends ITranslatable<IEntityLocalized> {
  groups: IGlossaryGroup[];
}

export interface IGlossary extends ITranslatable<IEntityLocalized> {
  terms: IGlossaryTerm[];
}

export const GlossaryFields = `${TranslatableFields}
terms { ${GlossaryTermFields} }`;
