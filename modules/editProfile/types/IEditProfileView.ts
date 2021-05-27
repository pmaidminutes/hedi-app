import { IAppPage } from "@/modules/common/types";
import { IEntity, ILanguage } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";

export interface IEditProfileFormConfig {
  lang: string;
  languageOptions: ILanguage[];
  // ServiceGroups
}

export interface IEditProfileView extends IAppPage, IEditProfileFormConfig {
  links: (IEntity & IWithKey)[];
}

export const extractConfig = (
  view: IEditProfileView
): IEditProfileFormConfig => ({
  lang: view.lang,
  languageOptions: view.languageOptions,
});
