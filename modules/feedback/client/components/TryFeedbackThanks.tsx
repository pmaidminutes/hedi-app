import { ITyped } from "@/modules/model";
import { IPage } from "@/modules/page/types";
import { FeedbackThanksView } from "./FeedbackThanksView";

export const TryFeedbackThanks = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "FeedbackThanks" ? (
    <FeedbackThanksView content={content as IPage} />
  ) : null;
