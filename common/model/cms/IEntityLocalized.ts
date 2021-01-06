import { gql } from "@/common/graphql";
import { EntityFields, IEntity, implementsIEntity } from "./IEntity";
import {
  ILocalized,
  implementsILocalized,
  LocalizedFields,
} from "./ILocalized";

export interface IEntityLocalized extends IEntity, ILocalized {}

export const implementsIEntityLocalized = (obj: any) =>
  implementsIEntity(obj) && implementsILocalized(obj);

export function isILocalizedEntity(obj: any): obj is IEntityLocalized {
  return implementsIEntityLocalized(obj);
}

export const EntityLocalizedFields = `${EntityFields}
${LocalizedFields}
`;

export const EntityLocalizedFrag = gql`
fragment EntityLocalizedFrag on IEntityLocalized {
  ${EntityLocalizedFields}
}`;
