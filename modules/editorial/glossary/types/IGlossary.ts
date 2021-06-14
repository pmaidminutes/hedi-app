import { gql } from "@/modules/graphql";
import {
  EntityTranslatedFields,
  IEntityLocalized,
  IEntityTranslated,
} from "@/modules/model";
import { IGlossaryTerm } from ".";
import { GlossaryTermGQL } from "./IGlossaryTerm";

export interface IGlossary extends IEntityTranslated<IEntityLocalized> {
  glossaryTerms: IGlossaryTerm[];
}

export function isIGlossary(obj: any): obj is IGlossary {
  return obj && obj.type === "Glossary";
}
export const GlossaryGQL = gql`
  ${EntityTranslatedFields}
  ${GlossaryTermGQL}
`;
