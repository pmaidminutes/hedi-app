import { gql } from "@/common/graphql";
import { EntityFields, IEntity, isIEntity } from "./IEntity";
import { isISlug, ISlug, SlugFields } from "./ISlug";
import { ITranslatable } from "./ITranslatable";
import {
  isITranslations,
  ITranslations,
  TranslationsFields,
} from "./ITranslations";

export interface ITaxonomy
  extends IEntity,
    ISlug,
    ITranslations<ITranslatable> {
  parent?: number;
}

export function isITaxonomy(obj: any): obj is ITaxonomy {
  return obj &&
    obj.parent !== undefined &&
    isIEntity(obj) &&
    isISlug(obj) &&
    isITranslations(obj)
    ? true
    : false;
}

export const TaxonomyFields = `
  ${EntityFields}
  ${SlugFields}
  ${TranslationsFields}
  parent
`;

export const TaxonomyFrag = gql`
fragment TaxonomyFrag on ITaxonomy {
  ${TaxonomyFields}
}
`;
