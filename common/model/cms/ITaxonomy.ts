import { gql } from "@/common/graphql";
import { EntityFields, IEntity, isIEntity } from "./IEntity";
import { isISlug, ISlug, SlugFields } from "./ISlug";

export interface ITaxonomy extends IEntity, ISlug  {
  parent?: number
}

export function isITaxonomy(obj: any) : obj is ITaxonomy {
  return (obj && obj.parent !== undefined && isIEntity(obj) && isISlug(obj)) ? true : false;
}

export const TaxonomyFields = `
  ${EntityFields}
  ${SlugFields}
  parent
`;

export const TaxonomyFrag = gql`
fragment TaxonomyFrag on ITaxonomy {
  ${TaxonomyFields}
}
`;