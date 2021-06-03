import { ITyped } from "@/modules/model";
import { IPage } from "@/modules/page/types";
import { FeedbackView } from "./FeedbackView";

export const TryFeedback = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Feedback" ? (
    <FeedbackView content={content as IPage} />
  ) : null;
