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

export const GlossaryGQL = gql`
  ${EntityTranslatedFields}
  ${GlossaryTermGQL}
`;
