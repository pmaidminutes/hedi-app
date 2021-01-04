import { gql } from "@/common/graphql";

export interface ILocalized {
  lang: string;
}

export const implementsILocalized = (obj: any) => !!(obj && obj.lang);

export function isILocalized(obj: any): obj is ILocalized {
  return implementsILocalized(obj);
}

export const LocalizedFields = `lang`;

export const LocalizedFrag = gql`
fragment LocalizedFrag on ILocalized {
  ${LocalizedFields}
}`;
