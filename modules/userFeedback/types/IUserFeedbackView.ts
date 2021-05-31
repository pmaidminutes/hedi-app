import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IPage } from "@/modules/page/types";

export interface IUserFeedbackFormConfig {
  lang: string;
  subPages: IAppPage[];
}

export interface IUserFeedbackView extends IAppPage, IUserFeedbackFormConfig {
  profileDefinition?: IPage;
  links: (IEntity & IWithKey)[];
}
