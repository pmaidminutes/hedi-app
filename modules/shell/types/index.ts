import { IShellLink } from "./shellLinks";
import {
  IAppStyled,
  IEntity,
  IEntityLocalized,
  ILanguage,
  IUIElementTexts,
} from "@/modules/model";
import { IAppPage } from "@/modules/common/types";

export interface IShellProps
  extends Partial<IAppStyled>,
    Pick<
      IPageConfig,
      "redirectUnAuthorized" | "useHeader" | "useBreadCrumb" | "revalidate"
    > {
  shellConfigs: IUIElementTexts[];
  languageSwitchLinks: IEntity[];
  header?: IShellLink[];
  footer?: IShellLink[];
  userMenu?: IShellLink[];
}

export type AccessRule = false | "AUTHORIZED" | true; // HACK definition for quick compatibility actual meaning: hidden, authorized user, always

export interface IPageConfig extends Partial<IAppStyled> {
  translations?: IEntityLocalized[];
  redirectUnAuthorized?: string; // HACK
  useHeader?: AccessRule;
  // TODO: Serverseitig
  useBreadCrumb?: boolean;
  revalidate?: boolean | number;
}

// export type shellRecords = "header" | "footer"

export interface IShell extends Record<string, IEntity[] | IAppPage[]> {
  languages: ILanguage[];
  shellConfigs: IAppPage[];
}

export interface IPageProps<T> {
  content: T;
  shell: Partial<IShellProps>;
}
