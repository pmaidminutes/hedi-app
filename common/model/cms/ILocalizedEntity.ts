import { gql } from "@/common/graphql";
import { EntityFields, IEntity, implementsIEntity } from "./IEntity";
import {
  ILocalized,
  implementsILocalized,
  LocalizedFields,
} from "./ILocalized";

export interface ILocalizedEntity extends IEntity, ILocalized {}

export const implementsILocalizedEntity = (obj: any) =>
  implementsIEntity(obj) && implementsILocalized(obj);

export function isILocalizedEntity(obj: any): obj is ILocalizedEntity {
  return implementsILocalizedEntity(obj);
}

export const LocalizedEntityFields = `${EntityFields}
${LocalizedFields}
`;

export const LocalizedEntityFrag = gql`
fragment LocalizedEntityFrag on ILocalizedEntity {
  ${LocalizedEntityFields}
}`;
