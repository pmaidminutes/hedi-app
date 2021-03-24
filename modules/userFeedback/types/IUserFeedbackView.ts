import { IAppPage } from "@/modules/common/types";

export interface IUserFeedbackFormConfig {
  lang: string;
  subPages: IAppPage[];
}

export interface IUserFeedbackView extends IAppPage, IUserFeedbackFormConfig {}
