import { gql } from "@/common/graphql";
import { BodyFields, IBody, isIBody } from "./IBody";
import { EntityFields, IEntity, isIEntity } from "./IEntity";
import { isISlug, ISlug, SlugFields } from "./ISlug";
import { isITranslatable, ITranslatable, TranslatableFields } from "./ITranslatable";

export interface IContent extends IEntity, ISlug, ITranslatable<IContent>, IBody { }

export function isIContent(obj: any) : obj is IContent {
  return (obj && isIBody(obj) && isISlug(obj) && isITranslatable(obj) && isIEntity(obj)) ? true : false;
}

export const ContentFields = `
  ${EntityFields}
  ${SlugFields}
  ${TranslatableFields}
  ${BodyFields}
`;

export const ContentFrag = gql`
fragment ContentFrag on IContent {
  ${ContentFields}
}
`;