// types
import { ColumnDefaultProps } from "carbon-components-react";
import { IFeedbackView } from "@/modules/feedback/types";
import { ProfileView } from "@/modules/profile/types";
export interface IFeedbackFormProps {
  content: IFeedbackView;
  profile: ProfileView;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  centerProps?: ColumnDefaultProps;
}
