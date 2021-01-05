import { gql } from "@/common/graphql";
import { isILocalized, ILocalized, LocalizedFields } from "./ILocalized";
import {
  IEntityLocalized,
  implementsIEntityLocalized,
  EntityLocalizedFields,
} from "./IEntityLocalized";

export interface ITranslatable<T extends IEntityLocalized>
  extends IEntityLocalized {
  translations: T[];
}

export const implementsITranslatable = (obj: any) =>
  implementsIEntityLocalized(obj) && obj.translations;

export function isITranslatable<T extends IEntityLocalized>(
  obj: any
): obj is ITranslatable<T> {
  return implementsITranslatable(obj);
}

export const TranslatableFields = `
  ${EntityLocalizedFields}
  translations(includeSelf: $includeSelf) {
    ${EntityLocalizedFields}
  }
`;

export const TranslatableFrag = gql`
fragment TranslatableFrag on ITranslatable {
  ${TranslatableFields}
}`;
