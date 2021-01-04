import { gql } from "@/common/graphql";

export interface ISummary {
  summary: string;
}

export const implementsISummary = (obj: any) =>
  !!(obj && obj.summary !== undefined);

export function isISummary(obj: any): obj is ISummary {
  return implementsISummary(obj);
}

export const SummaryFields = `summary`;

export const SummaryFrag = gql`
fragment SummaryFrag on ISummary {
  ${SummaryFields}
}`;
