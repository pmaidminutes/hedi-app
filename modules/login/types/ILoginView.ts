import { IAppPage } from "@/modules/common/types";
import { IEntity } from "@/modules/model";

export interface ILoginView extends IAppPage {
  links: (IEntity & { key: string })[];
}
