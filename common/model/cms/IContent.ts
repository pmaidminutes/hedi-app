import { gql } from "@/common/graphql";
import { BodyFields, IBody, isIBody } from "./IBody";
import { EntityFields, IEntity, isIEntity } from "./IEntity";
import { isISlug, ISlug, SlugFields } from "./ISlug";
import { ITranslatable } from "./ITranslatable";
import {
  isITranslations,
  ITranslations,
  TranslationsFields,
} from "./ITranslations";

export interface IContent
  extends IEntity,
    ISlug,
    ITranslations<ITranslatable>,
    IBody {}

export function isIContent(obj: any): obj is IContent {
  return obj &&
    isIBody(obj) &&
    isISlug(obj) &&
    isITranslations(obj) &&
    isIEntity(obj)
    ? true
    : false;
}

export const ContentFields = `
  ${EntityFields}
  ${SlugFields}
  ${BodyFields}
  ${TranslationsFields}
`;

export const ContentFrag = gql`
fragment ContentFrag on IContent {
  ${ContentFields}
}
`;
