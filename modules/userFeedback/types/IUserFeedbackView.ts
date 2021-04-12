import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";

export interface IUserFeedbackFormConfig {
  lang: string;
  subPages: IAppPage[];
}

export interface IUserFeedbackView extends IAppPage, IUserFeedbackFormConfig {
  links: (IEntity & { key: string })[];
}
