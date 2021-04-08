import { UserFeedbackFields, UserFeedbackInput } from ".";

// UNUSED
export interface IUserFeedbackError extends UserFeedbackInput {
  generic?: string;
}

// UNUSED
export const UserFeedbackErrorFields = `generic ${UserFeedbackFields}`;
