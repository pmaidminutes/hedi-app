import { gql } from "@/common/graphql";

export interface IBody {
  body: string;
}

export const implementsIBody = (obj: any) => !!(obj && obj.body);

export function isIBody(obj: any): obj is IBody {
  return implementsIBody(obj);
}

export const BodyFields = `body`;

export const BodyFrag = gql`
fragment BodyFrag on IBody {
  ${BodyFields}
}`;
