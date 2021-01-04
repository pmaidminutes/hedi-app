import { gql } from "@/common/graphql";
import { BodyFields, IBody, implementsIBody } from "./IBody";
import { ILocalizedEntity } from "./ILocalizedEntity";
import {
  implementsITranslatable,
  ITranslatable,
  TranslatableFields,
} from "./ITranslatable";

export interface IContent<T extends ILocalizedEntity>
  extends ITranslatable<T>,
    IBody {}

export const implementsIContent = (obj: any) =>
  implementsITranslatable(obj) && implementsIBody(obj);

export function isIContent<T extends ILocalizedEntity>(
  obj: any
): obj is IContent<T> {
  return implementsIContent(obj);
}

export const ContentFields = `${TranslatableFields}
${BodyFields}`;

export const ContentFrag = gql`
fragment ContentFrag on IContent {
  ${ContentFields}
}`;
