import { gql } from "@/common/graphql";
import {
  isITranslatable,
  ITranslatable,
  TranslatableFields,
} from "./ITranslatable";

export interface ITranslations<T extends ITranslatable> extends ITranslatable {
  translations: T[];
}

export function isITranslations<T extends ITranslatable>(
  obj: any
): obj is ITranslations<T> {
  return obj && obj.translations && isITranslatable(obj) ? true : false;
}

export const TranslationsFields = `
  ${TranslatableFields}
  translations(excludeSelf: $excludeSelf) {
    ${TranslatableFields}
  }
`;

export const TranslationFrag = gql`
fragment TranslationFrag on ITranslations {
  ${TranslationsFields}
}`;
