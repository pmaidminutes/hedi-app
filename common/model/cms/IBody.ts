import { gql } from "@/common/graphql";

export interface IBody {
  body: string
  summary: string
}

export function isIBody(obj: any) : obj is IBody {
  return (obj && obj.body && obj.summary) ? true : false;
}

export const BodyFields = `
  body
  summary
`;

export const BodyFrag = gql`
fragment BodyFrag on IBody {
  ${BodyFields}
}`;