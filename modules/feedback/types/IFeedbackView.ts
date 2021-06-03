import { IPage } from "@/modules/page/types";
import { IEntity } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IProfileViewDefinition } from "@/modules/profile/client/components";

export interface IFeedbackFormConfig {
  lang: string;
}

export interface IFeedbackView extends IPage, IFeedbackFormConfig {
  profileDefinition: IProfileViewDefinition;
  links: (IEntity & IWithKey)[];
}
