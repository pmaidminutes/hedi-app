import { IAppPage } from "@/modules/common/types";
import { IShellLink } from "@/modules/shell/types/shellLinks";

export interface IViewProfileView extends IAppPage {
  links: IShellLink[];
}
