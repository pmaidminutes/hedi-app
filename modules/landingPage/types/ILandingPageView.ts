import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";

export interface ILandingPageView extends IAppPage {
  links: (IEntity & IWithKey & { longTitle?: string })[];
  linksIfLoggedIn: (IEntity & IWithKey & { longTitle?: string })[];
}
