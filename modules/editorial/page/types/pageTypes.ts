import { gql } from "@/modules/graphql";
import {
  EditorialFields,
  IEditorial,
  IEntityLocalized,
  ISummary,
  EntityLocalizedFields,
  SummaryFields,
  IRouteLabeled,
  RouteLabelFields,
} from "@/modules/model";
import { IImage, ImageFields } from "../../types";

export interface IPageEntry extends IEntityLocalized, ISummary {}

export const PageEntryFields = `${EntityLocalizedFields}
${SummaryFields}`;

export const PageEntryFrag = gql`
fragment PageEntryFrag on Page {
  ${PageEntryFields}
}
`;

export interface IPage extends IPageEntry, IEditorial<IEntityLocalized> {
  routelabel: IRouteLabeled;
  posterImage?: IImage;
}

// UNUSED
export function isIPage(obj: any): obj is IPage {
  return obj && obj.typeName === "Page";
}

export const PageFields = `${EditorialFields}
${RouteLabelFields}
posterImage {${ImageFields}}
`;

// UNUSED
export const PageFrag = gql`
fragment PageFrag on Page {
  ${PageFields} 
}
`;
