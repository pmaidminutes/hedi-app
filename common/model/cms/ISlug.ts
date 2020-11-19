import { gql } from "@/common/graphql";
import { EntityFields, IEntity } from "./IEntity";

export interface ISlug extends IEntity {
  slug: string
}

export function isISlug(obj: any) : obj is ISlug {
  return (obj && obj.typeName && obj.id && obj.label && obj.slug) ? true : false;
}

export const SlugFields = `
  ${EntityFields}
  slug
`;

export const SlugFrag = gql`
fragment SlugFrag on ISlug {
  ${SlugFields}
}
`;