import { IUserFeedback } from "./IUserFeedback";

export type UserFeedbackInput = Partial<
  Omit<IUserFeedback, "type" | "route" | "created">
>;
