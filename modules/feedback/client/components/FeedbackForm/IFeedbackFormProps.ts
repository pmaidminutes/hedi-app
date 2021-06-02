// types
import { ColumnDefaultProps } from "carbon-components-react";
import { IFeedbackView } from "@/modules/feedback/types";
import { ProfileView } from "@/modules/profile/types";
import { IPage } from "@/modules/page/types";
export interface IFeedbackFormProps {
  content: IPage;
  profile: ProfileView;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  centerProps?: ColumnDefaultProps;
}
