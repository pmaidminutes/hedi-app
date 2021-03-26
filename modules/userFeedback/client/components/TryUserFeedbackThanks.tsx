import { IAppPage } from "@/modules/common/types";
import { ITyped } from "@/modules/model";
import { UserFeedbackThanksView } from "./UserFeedbackThanksView";

export const TryUserFeedbackThanks = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "UserFeedbackThanks" ? (
    <UserFeedbackThanksView content={content as IAppPage} />
  ) : null;
