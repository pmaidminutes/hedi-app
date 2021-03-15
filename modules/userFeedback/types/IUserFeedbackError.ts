import { UserFeedbackFields } from "@/modules/model/IUserFeedback";
import { IUserFeedbackInfo } from "./IUserFeedbackInfo";

export interface IUserFeedbackError extends IUserFeedbackInfo {
  generic?: string;
}

export const UserFeedbackErrorFields = `generic ${UserFeedbackFields}`;
