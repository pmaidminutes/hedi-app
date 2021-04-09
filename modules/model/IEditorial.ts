import {
  ContentFields,
  IContent,
  implementsIContent,
  isIContent,
} from "./IContent";
import { IEntityLocalized } from "./IEntityLocalized";
import { implementsISummary, ISummary, SummaryFields } from "./ISummary";
import {
  implementsIWithTags,
  isIWithTags,
  IWithTags,
  WithTagsFields,
} from "./IWithTags";

export interface IEditorial<T extends IEntityLocalized>
  extends IContent<T>,
    ISummary,
    IWithTags {}

// UNUSED
export const implementsIEditorial = (obj: any) =>
  implementsIContent(obj) &&
  implementsISummary(obj) &&
  implementsIWithTags(obj);

// UNUSED
export function isIEditorial<T extends IEntityLocalized>(
  obj: any
): obj is IEditorial<T> {
  return obj && isIContent(obj) && isIWithTags(obj) ? true : false;
}

export const EditorialFields = `
${ContentFields}
${SummaryFields}
${WithTagsFields}`;
