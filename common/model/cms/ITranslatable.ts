import { gql } from "@/common/graphql";

export interface ITranslatable {
  langcode: string
};

export function isITranslatable(obj: any) : obj is ITranslatable {
  return (obj && obj.langcode) ? true : false;
}

export const TranslatableFields = `
  langcode
`;

export const TranslatableFrag = gql`
fragment TranslatableFrag on ITranslatable {
  ${TranslatableFields}
}`;