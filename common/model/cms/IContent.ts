import { gql } from "@/common/graphql";
import { BodyFields, IBody, implementsIBody } from "./IBody";
import { IEntityLocalized } from "./IEntityLocalized";
import {
  implementsIEntityTranslated,
  IEntityTranslated,
  EntityTranslatedFields,
} from "./IEntityTranslated";

export interface IContent<T extends IEntityLocalized>
  extends IEntityTranslated<T>,
    IBody {}

export const implementsIContent = (obj: any) =>
  implementsIEntityTranslated(obj) && implementsIBody(obj);

export function isIContent<T extends IEntityLocalized>(
  obj: any
): obj is IContent<T> {
  return implementsIContent(obj);
}

export const ContentFields = `${EntityTranslatedFields}
${BodyFields}`;

export const ContentFrag = gql`
fragment ContentFrag on IContent {
  ${ContentFields}
}`;
