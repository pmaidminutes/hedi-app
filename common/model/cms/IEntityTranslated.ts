import { gql } from "@/common/graphql";
import {
  IEntityLocalized,
  implementsIEntityLocalized,
  EntityLocalizedFields,
} from "./IEntityLocalized";

export interface IEntityTranslated<T extends IEntityLocalized>
  extends IEntityLocalized {
  translations: T[];
}

export const implementsIEntityTranslated = (obj: any) =>
  implementsIEntityLocalized(obj) && obj.translations;

export function isIEntityTranslated<T extends IEntityLocalized>(
  obj: any
): obj is IEntityTranslated<T> {
  return implementsIEntityTranslated(obj);
}

export const EntityTranslatedFields = `
  ${EntityLocalizedFields}
  translations(includeSelf: $includeSelf) {
    ${EntityLocalizedFields}
  }
`;

export const TranslatableFrag = gql`
fragment TranslatableFrag on ITranslatable {
  ${EntityTranslatedFields}
}`;
