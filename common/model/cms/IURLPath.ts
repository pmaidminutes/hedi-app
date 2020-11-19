import { gql } from "@/common/graphql";
import { isISlug, ISlug, SlugFields } from "./ISlug";

export interface IURLPath extends ISlug {
  path: string
}

export function isIURLPath(obj: any) : obj is IURLPath {
  return (obj && obj.path && isISlug(obj)) ? true : false;
}

export const URLPathFields = `
  ${SlugFields}
  urlpath
`;

export const URLPathFrag = gql`
fragment URLPathFrag on IURLPath {
  ${URLPathFields}
}
`;