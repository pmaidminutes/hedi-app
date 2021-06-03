// types
import { ColumnDefaultProps } from "carbon-components-react";
import { ProfileView } from "@/modules/profile/types";
import { IPage } from "@/modules/page/types";
export interface IProfileTestFeedbackFormProps {
  content: IPage;
  profile: ProfileView;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  centerProps?: ColumnDefaultProps;
}
