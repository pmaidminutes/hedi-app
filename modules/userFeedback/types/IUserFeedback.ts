import { gql } from "@/modules/graphql";
import { EntityFields, IEntity } from "@/modules/model";
import { MutationResponseFields } from "@/modules/model/IMutationResponse";

export interface IUserFeedback extends IEntity {
  label: string;
  body: string;
  metadata?: object;
  created?: Date;
}

export const implementsIUserFeedback = (obj: any) =>
  obj.body != null && obj.metadata != null;

export const UserFeedbackFields = `${EntityFields}
body
metadata
created`;

export const insertUserFeedbackMutation = gql`
mutation sendUserFeedback($input: UserFeedbackInput!, $lang: String) {
  insertUserFeedback(input: $input, lang: $lang) {
    ${MutationResponseFields}
  }
}
`;
