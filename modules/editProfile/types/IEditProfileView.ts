import { IAppPage } from "@/modules/common/types";
import { IEntity, ILanguage } from "@/modules/model";

export interface IEditProfileView extends IAppPage {
  children: IAppPage[];
  domainOptions: IEntity[];
  languageOptions: ILanguage[];
}
