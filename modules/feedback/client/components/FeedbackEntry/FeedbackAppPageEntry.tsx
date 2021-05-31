import { IAppPage } from "@/modules/common/types";
import { FeedbackEntry } from "./FeedbackEntry";

// UNUSED
export interface IUserFeedbackEntryProps {
  content: IAppPage;
}

export const FeedbackAppPageEntry = (content: IAppPage) => {
  const entryModel = { ...content, showTitle: false, hideLegends: true };
  return (
    <div className="hedi--userfeedback-item">
      <div
        className="hedi--userfeedback-text"
        dangerouslySetInnerHTML={{ __html: content.body }}></div>
      <FeedbackEntry {...entryModel} />
    </div>
  );
};
