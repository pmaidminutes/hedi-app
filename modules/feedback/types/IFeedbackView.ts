import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IProfileDefinition } from "@/modules/profile/types";

export interface IFeedbackFormConfig {
  lang: string;
  subPages: IAppPage[];
}

export interface IFeedbackView extends IAppPage, IFeedbackFormConfig {
  profileDefinition: IProfileDefinition;
  links: (IEntity & IWithKey)[];
}
