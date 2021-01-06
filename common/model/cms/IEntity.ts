import { gql } from "@/common/graphql";
import { implementsITyped, ITyped, TypedFields } from "./ITyped";

export interface IEntity extends ITyped {
  route: string;
  label: string;
}

export const implementsIEntity = (obj: any) =>
  !!(implementsITyped(obj) && obj.id && obj.label);

export function isIEntity(obj: any): obj is IEntity {
  return implementsIEntity(obj);
}

export const EntityFields = `${TypedFields}
route
label`;

export const EntityFrag = gql`
fragment EntityFrag on IEntity {
  ${EntityFields}
}`;
