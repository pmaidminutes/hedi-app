import { ITyped } from "@/modules/model";
import { IFeedbackView } from "../../types";
import { FeedbackView } from "./FeedbackView";

export const TryFeedback = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Feedback" ? (
    <FeedbackView content={content as IFeedbackView} />
  ) : null;
