import { gql } from "@/modules/graphql";
import {
  EntityTranslatedFields,
  IEntityLocalized,
  IEntityTranslated,
} from "@/modules/model";
import { IPage } from "@/modules/page/types";
import { IGlossaryTerm } from ".";
import { GlossaryTermGQL } from "./IGlossaryTerm";

export interface IGlossary extends IPage {
  glossaryTerms: IGlossaryTerm[];
}

export const GlossaryGQL = gql`
  ${EntityTranslatedFields}
  ${GlossaryTermGQL}
`;
