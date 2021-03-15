import { EntityFields } from "@/modules/model";

export interface IUserFeedbackInfo {
  label: string;
  body: string;
  metadata?: object;
  createdTime?: Date;
}

export const implementsIUserFeedback = (obj: any) =>
  obj.body != null && obj.metadata != null;

export const UserFeedbackFields = `${EntityFields}
body
metadata
createdTime`;
