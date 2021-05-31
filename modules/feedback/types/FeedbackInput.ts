import { IFeedback } from "./IFeedback";

export type FeedbackInput = Partial<
  Omit<IFeedback, "type" | "route" | "created">
>;
