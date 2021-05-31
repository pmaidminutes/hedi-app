import { ITyped } from "@/modules/model";
import { IUserFeedbackView } from "../../types";
import { UserFeedbackView } from "./UserFeedbackView";

export const TryUserFeedback = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "UserFeedback" ? (
    <UserFeedbackView content={content as IUserFeedbackView} />
  ) : null;
