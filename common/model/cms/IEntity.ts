import { gql } from "@/common/graphql";
import { implementsITypename, ITypename, TypenameFields } from "./ITypename";

export interface IEntity extends ITypename {
  route: string;
  label: string;
}

export const implementsIEntity = (obj: any) =>
  !!(implementsITypename(obj) && obj.id && obj.label);

export function isIEntity(obj: any): obj is IEntity {
  return implementsIEntity(obj);
}

export const EntityFields = `${TypenameFields}
route
label`;

export const EntityFrag = gql`
fragment EntityFrag on IEntity {
  ${EntityFields}
}`;
