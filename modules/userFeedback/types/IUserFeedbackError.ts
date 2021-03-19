import { UserFeedbackFields, UserFeedbackInput } from ".";

export interface IUserFeedbackError extends UserFeedbackInput {
  generic?: string;
}

export const UserFeedbackErrorFields = `generic ${UserFeedbackFields}`;
