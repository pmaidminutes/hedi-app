import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";

export interface IUserFeedbackThanksView extends IAppPage {
  links: (IEntity & { key: string })[];
}
