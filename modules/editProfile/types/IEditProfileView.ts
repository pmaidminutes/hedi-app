import { IAppPage } from "@/modules/common/types";
import {
  IEntity,
  ILanguage,
  IServiceGroup,
  IUIElementTexts,
} from "@/modules/model";

export interface IEditProfileFormConfig {
  lang: string;
  elements: IUIElementTexts[];
  conditionalElements: Record<string, IUIElementTexts[]>;
  languageOptions: ILanguage[];
  domainOptions: IEntity[];
  conditionalServiceGroups: Record<string, IServiceGroup[]>;
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
