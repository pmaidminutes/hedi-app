import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";

export interface ILandingPageView extends IAppPage {
  links: (IEntity & { key: string })[];
}
