// types
import { ColumnDefaultProps } from "carbon-components-react";
import { IUserFeedbackView } from "@/modules/feedback/types";
import { ProfileView } from "@/modules/profile/types";
export interface IUserFeedbackFormProps {
  content: IUserFeedbackView;
  profile: ProfileView;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  centerProps?: ColumnDefaultProps;
}
