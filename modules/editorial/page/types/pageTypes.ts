import { gql } from "@/modules/graphql";
import {
  EditorialFields,
  EntityFields,
  IEditorial,
  IEntity,
  IEntityLocalized,
  ISummary,
  EntityLocalizedFields,
  SummaryFields,
  IRouteLabeled,
  RouteLabelFields,
} from "@/modules/model";
export interface IPageEntry extends IEntityLocalized, ISummary {}

export const PageEntryFields = `${EntityLocalizedFields}
${SummaryFields}`;

export const PageEntryFrag = gql`
fragment PageEntryFrag on Page {
  ${PageEntryFields}
}
`;

export interface IPage
  extends IPageEntry,
    IEditorial<IEntityLocalized> {
  routelabel: IRouteLabeled;
}

export function isIPage(obj: any): obj is IPage {
  return obj && obj.typeName === "Page";
}

export const PageFields = `${EditorialFields}
${RouteLabelFields}
`;

export const PageFrag = gql`
fragment PageFrag on Page {
  ${PageFields} 
}
`;
