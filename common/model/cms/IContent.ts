import { gql } from "@/common/graphql";
import { BodyFields, IBody, isIBody } from "./IBody";
import { isISlug, ISlug, SlugFields } from "./ISlug";
import { isITranslatable, ITranslatable, TranslatableFields } from "./ITranslatable";

export interface IContent extends ISlug, ITranslatable, IBody { }

export function isIContent(obj: any) : obj is IContent {
  return (obj && isISlug(obj) && isITranslatable(obj) && isIBody(obj)) ? true : false;
}

export const ContentFields = `
  ${SlugFields}
  ${TranslatableFields}
  ${BodyFields}
`;

export const ContentFrag = gql`
fragment ContentFrag on IContent {
  ${ContentFields}
}
`;