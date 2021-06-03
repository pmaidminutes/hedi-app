import { gql } from "@/modules/graphql";
import { EntityFields, IEntity } from "@/modules/model";
import { MutationResponseFields } from "@/modules/model/IMutationResponse";

export interface IFeedback extends IEntity {
  label: string;
  body: string;
  metadata?: object;
  created?: Date;
}

// UNUSED
export const implementsIUserFeedback = (obj: any) =>
  obj.body != null && obj.metadata != null;

export const UserFeedbackGQL = gql`... on UserFeedback {
${EntityFields}
body
metadata
created
}`;

export type FeedbackType = "ProfileTest";

export const insertFeedbacksMutation = gql`
mutation insertFeedback($type: String!, $texts: [String!]!) {
  insertFeedback(type: $type, texts: $texts) {
    ${MutationResponseFields}
  }
}
`;
