import { gql } from "@/common/graphql";
import { isILocalized, ILocalized, LocalizedFields } from "./ILocalized";
import {
  ILocalizedEntity,
  implementsILocalizedEntity,
  LocalizedEntityFields,
} from "./ILocalizedEntity";

export interface ITranslatable<T extends ILocalizedEntity>
  extends ILocalizedEntity {
  translations: T[];
}

export const implementsITranslatable = (obj: any) =>
  implementsILocalizedEntity(obj) && obj.translations;

export function isITranslatable<T extends ILocalizedEntity>(
  obj: any
): obj is ITranslatable<T> {
  return implementsITranslatable(obj);
}

export const TranslatableFields = `
  ${LocalizedEntityFields}
  translations(includeSelf: $includeSelf) {
    ${LocalizedEntityFields}
  }
`;

export const TranslatableFrag = gql`
fragment TranslatableFrag on ITranslatable {
  ${TranslatableFields}
}`;
