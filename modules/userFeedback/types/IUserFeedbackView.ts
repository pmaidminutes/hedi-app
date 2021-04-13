import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";
import { ProfileDefinition } from "@/modules/profile/query/getProfileDefinition";

export interface IUserFeedbackFormConfig {
  lang: string;
  subPages: IAppPage[];
}

export interface IUserFeedbackView extends IAppPage, IUserFeedbackFormConfig {
  profileDefinition: ProfileDefinition;
  links: (IEntity & { key: string })[];
}
