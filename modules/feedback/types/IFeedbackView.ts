import { IPage } from "@/modules/page/types";
import { IEntity } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IProfileDefinition } from "@/modules/profile/types";

export interface IFeedbackFormConfig {
  lang: string;
}

export interface IFeedbackView extends IPage, IFeedbackFormConfig {
  profileDefinition: IProfileDefinition;
  links: (IEntity & IWithKey)[];
}
