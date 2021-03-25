import { IShellLink } from "./shellLinks";
import {
  IAppStyled,
  IEntity,
  IEntityLocalized,
  ILanguage,
} from "@/modules/model";

export interface IShellProps
  extends Partial<IAppStyled>,
    Pick<
      IPageConfig,
      "needsAuth" | "useHeader" | "useBreadCrumb" | "revalidate"
    > {
  languageSwitchLinks: IEntity[];
  header?: IShellLink[];
  footer?: IShellLink[];
  userMenu?: IShellLink[];
}

export interface IPageConfig extends Partial<IAppStyled> {
  translations?: IEntityLocalized[];
  needsAuth?: boolean;
  useHeader?: boolean;
  // TODO: Serverseitig
  useBreadCrumb?: boolean;
  revalidate?: boolean | number;
}

// export type shellRecords = "header" | "footer"

export interface IShell extends Record<string, IEntity[]> {
  languages: ILanguage[];
}

export interface IPageProps<T> {
  content: T;
  shell: Partial<IShellProps>;
}
