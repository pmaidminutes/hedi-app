import { ITyped } from "@/modules/model";
import { IFeedbackThanksView } from "../../types";
import { FeedbackThanksView } from "./FeedbackThanksView";

export const TryFeedbackThanks = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "FeedbackThanks" ? (
    <FeedbackThanksView content={content as IFeedbackThanksView} />
  ) : null;
