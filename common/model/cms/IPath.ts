import { gql } from "@/common/graphql";
import { isISlug, ISlug, SlugFields } from "./ISlug";

export interface IPath extends ISlug {
  path: string
}

export function isIPath(obj: any) : obj is IPath {
  return (obj && obj.path && isISlug(obj)) ? true : false;
}

export const PathFields = `
  ${SlugFields}
  path
`;

export const PathFrag = gql`
fragment PathFrag on IPath {
  ${PathFields}
}
`;