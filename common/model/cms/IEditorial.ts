import { gql } from "@/common/graphql";

import { ContentFields, IContent, isIContent } from "./IContent";
import { isITags, ITags, TagsFields } from "./ITags";

export interface IEditorial extends IContent, ITags {}

export function isIEditorial(obj: any): obj is IContent {
  return obj && isIContent(obj) && isITags(obj) ? true : false;
}

export const EditorialFields = `
  ${ContentFields}
  ${TagsFields}
`;

export const EditorialFrag = gql`
fragment EditorialFrag on IEditorial {
  ${EditorialFields}
}
`;
