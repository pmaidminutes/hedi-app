import { gql } from "@/common/graphql";
import { isISlug, ISlug, SlugFields } from "./ISlug";

export interface ITaxonomy extends ISlug {
  parent?: number
}

export function isITaxonomy(obj: any) : obj is ITaxonomy {
  return (obj && obj.parent !== undefined && isISlug(obj)) ? true : false;
}

export const TaxonomyFields = `
  ${SlugFields}
  parent
`;

export const TaxonomyFrag = gql`
fragment TaxonomyFrag on ITaxonomy {
  ${TaxonomyFields}
}
`;