import { IAppPage } from "@/modules/common/types";
import { UserFeedbackEntry } from "./UserFeedbackEntry";

export interface IUserFeedbackEntryProps {
  content: IAppPage;
}

export const UserFeedbackAppPageEntry = (content: IAppPage) => {
  const entryModel = { ...content, showTitle: false };
  return (
    <div className="hedi--userfeedback-item">
      <div
        className="hedi--userfeedback-text"
        dangerouslySetInnerHTML={{ __html: content.body }}></div>
      <UserFeedbackEntry {...entryModel} />
    </div>
  );
};