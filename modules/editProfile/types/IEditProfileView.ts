import { IAppPage } from "@/modules/common/types";
import {
  IEntity,
  ILanguage,
  IServiceGroup,
  IUIElementTexts,
} from "@/modules/model";
import { ProfileType } from "@/modules/profile/types";

export interface IEditProfileFormConfig {
  lang: string;
  elements: IUIElementTexts[];
  conditionalElements: Partial<Record<ProfileType, IUIElementTexts[]>>;
  languageOptions: ILanguage[];
  domainOptions: IEntity[];
  conditionalServiceGroups: Partial<Record<ProfileType, IServiceGroup[]>>;
}

export interface IEditProfileView extends IAppPage, IEditProfileFormConfig {}

export const extractConfig = (
  view: IEditProfileView
): IEditProfileFormConfig => ({
  lang: view.lang,
  elements: view.elements,
  conditionalElements: view.conditionalElements,
  languageOptions: view.languageOptions,
  domainOptions: view.domainOptions,
  conditionalServiceGroups: view.conditionalServiceGroups,
});
