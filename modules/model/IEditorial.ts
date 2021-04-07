import {
  ContentFields,
  IContent,
  implementsIContent,
  isIContent,
} from "./IContent";
import { IEntityLocalized } from "./IEntityLocalized";
import { implementsISummary, ISummary, SummaryFields } from "./ISummary";
import { implementsITagged, isITagged, ITagged, TaggedFields } from "./ITagged";

export interface IEditorial<T extends IEntityLocalized>
  extends IContent<T>,
    ISummary,
    ITagged {}

// UNUSED
export const implementsIEditorial = (obj: any) =>
  implementsIContent(obj) && implementsISummary(obj) && implementsITagged(obj);

// UNUSED
export function isIEditorial<T extends IEntityLocalized>(
  obj: any
): obj is IEditorial<T> {
  return obj && isIContent(obj) && isITagged(obj) ? true : false;
}

export const EditorialFields = `
${ContentFields}
${SummaryFields}
${TaggedFields}`;
