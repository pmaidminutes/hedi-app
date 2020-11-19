import { gql } from "@/common/graphql";

export interface ISlug {
  slug: string
}

export function isISlug(obj: any) : obj is ISlug {
  return (obj && obj.slug) ? true : false;
}

export const SlugFields = `
  slug
`;

export const SlugFrag = gql`
fragment SlugFrag on ISlug {
  ${SlugFields}
}
`;