import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";

export interface IEditProfileView extends IAppPage {
  children: IAppPage[];
  domainOptions: IEntity[];
}
