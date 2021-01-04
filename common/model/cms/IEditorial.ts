import { gql } from "@/common/graphql";

import {
  ContentFields,
  IContent,
  implementsIContent,
  isIContent,
} from "./IContent";
import { ILocalizedEntity } from "./ILocalizedEntity";
import { implementsISummary, ISummary, SummaryFields } from "./ISummary";
import { implementsITagged, isITagged, ITagged, TaggedFields } from "./ITagged";

export interface IEditorial<T extends ILocalizedEntity>
  extends IContent<T>,
    ISummary,
    ITagged {}

export const implementsIEditorial = (obj: any) =>
  implementsIContent(obj) && implementsISummary(obj) && implementsITagged(obj);

export function isIEditorial<T extends ILocalizedEntity>(
  obj: any
): obj is IEditorial<T> {
  return obj && isIContent(obj) && isITagged(obj) ? true : false;
}

export const EditorialFields = `${ContentFields}
${SummaryFields}
${TaggedFields}`;

export const EditorialFrag = gql`
fragment EditorialFrag on IEditorial {
  ${EditorialFields}
}`;
