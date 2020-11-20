import { gql } from "@/common/graphql";

export interface ITranslatable<T extends ITranslatable<T>> {
  langcode: string
  translations: T[]
}

export function isITranslatable<T extends ITranslatable<T>>(obj: any) : obj is ITranslatable<T> {
  return (obj && obj.langcode && obj.translations) ? true : false;
}

export const TranslatableFields = `
  langcode
  translations(excludeSelf: $excludeSelf) {
    langcode
  }
`;

export const TranslatableFrag = gql`
fragment TranslatableFrag on ITranslatable {
  ${TranslatableFields}
}`;