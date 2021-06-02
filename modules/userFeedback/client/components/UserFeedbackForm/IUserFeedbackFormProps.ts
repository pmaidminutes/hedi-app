// types
import { ColumnDefaultProps } from "carbon-components-react";
import { IUserFeedbackView } from "@/modules/userFeedback/types";
import { IProfile } from "@/modules/profile/types";
export interface IUserFeedbackFormProps {
  content: IUserFeedbackView;
  profile: IProfile;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  centerProps?: ColumnDefaultProps;
}
