import { gql } from "@/modules/graphql";
import {
  IEntityLocalized,
  IEntityTranslated,
  EntityTranslatedFields,
} from "@/modules/model";

export interface IGlossaryTerm extends IEntityTranslated<IEntityLocalized> {}

export const GlossaryTermGQL = gql`... on GlossaryTerm {
${EntityTranslatedFields}
}`;

export interface IGlossaryGroup {
  key: string;
  terms: IGlossaryTerm[];
}

export interface IGlossary extends IEntityTranslated<IEntityLocalized> {
  terms: IGlossaryTerm[];
}
export function isIGlossary(obj: any): obj is IGlossary {
  return obj && obj.type === "Glossary";
}
export const GlossaryGQL = gql`... on Glossary {
${EntityTranslatedFields}
terms { ${GlossaryTermGQL} }
}`;
