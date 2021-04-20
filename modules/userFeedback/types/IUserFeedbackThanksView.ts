import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";

export interface IUserFeedbackThanksView extends IAppPage {
  links: (IEntity & IWithKey)[];
}
