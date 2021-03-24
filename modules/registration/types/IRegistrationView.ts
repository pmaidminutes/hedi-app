import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";

export interface IRegistrationView extends IAppPage {
  links: (IEntity & { key: string })[];
}
