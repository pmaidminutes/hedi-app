import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";

export interface IFeedbackThanksView extends IAppPage {
  links: (IEntity & IWithKey)[];
}
