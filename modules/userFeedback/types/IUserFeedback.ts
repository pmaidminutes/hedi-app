import { gql } from "@/modules/graphql";
import { EntityFields, IEntity } from "@/modules/model";
import { MutationResponseFields } from "@/modules/model/IMutationResponse";

export interface IUserFeedback extends IEntity {
  label: string;
  body: string;
  metadata?: object;
  created?: Date;
}

// UNUSED
export const implementsIUserFeedback = (obj: any) =>
  obj.body != null && obj.metadata != null;

export const UserFeedbackFields = `${EntityFields}
body
metadata
created`;

export const insertUserFeedbacksMutation = gql`
mutation sendUserFeedbacks($input: [UserFeedbackInput!]!, $lang: String) {
  insertUserFeedbacks(input: $input, lang: $lang) {
    ${MutationResponseFields}
  }
}
`;
