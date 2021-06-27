import { gql } from "@/modules/graphql";

import {
  IEntityLocalized,
  IEntityTranslated,
  EntityTranslatedFields,
} from "@/modules/model";

export interface IGlossaryTerm extends IEntityTranslated<IEntityLocalized> {
  body: string;
}

export const GlossaryTermGQL = gql`... on GlossaryTerm {
${EntityTranslatedFields}
body
}`;

export function isIGlossaryTerm(obj: any): obj is IGlossaryTerm {
  return obj && obj.type === "GlossaryTerm";
}
