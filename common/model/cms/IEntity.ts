import { gql } from "@/common/graphql";

export interface IEntity {
  typeName: string
  id: number
  label: string
};

export function isIEntity(obj: any) : obj is IEntity {
  return (obj && obj.typeName && obj.id && obj.label) ? true : false;
}

export const EntityFields = `
  typeName:__typename
  id
  label
`;

export const EntityFrag = gql`
fragment EntityFrag on IEntity {
  ${EntityFields}
}`;