import { IShellLink } from "./shellLinks";
import {
  IAppStyled,
  IEntity,
  IEntityLocalized,
  ILanguage,
  IUIElementTexts,
} from "@/modules/model";

export interface IShellProps
  extends Partial<IAppStyled>,
    Pick<
      IPageConfig,
      | "redirectUnAuthorized"
      | "useHeader"
      | "useBreadCrumb"
      | "revalidate"
      | "pageLayout"
      | "layoutImg"
    > {
  shellConfig: IUIElementTexts[];
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
  pageLayout?: PageLayout;
  layoutImg?: ILayoutImage;
}

export interface ILayoutImage {
  src?: string;
  alt?: string;
}


// export type shellRecords = "header" | "footer"

// interface IShell extends Record<string, IEntity[]> {
//   languages: ILanguage[];
//   shellConfig:  IUIElementTexts[];
// }

export type IShell = Record<string, IEntity[]> & {
  languages: ILanguage[];
  shellConfig: IUIElementTexts[];
};

export interface IPageProps<T> {
  content: T;
  shell: Partial<IShellProps>;
}

export type PageLayout = "singleColumn" | "imageAndColumn";
