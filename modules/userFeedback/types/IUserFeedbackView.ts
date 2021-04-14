import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";
import { IProfileDefinition } from "@/modules/profile/types";

export interface IUserFeedbackFormConfig {
  lang: string;
  subPages: IAppPage[];
}

export interface IUserFeedbackView extends IAppPage, IUserFeedbackFormConfig {
  profileDefinition: IProfileDefinition;
  links: (IEntity & { key: string })[];
}
