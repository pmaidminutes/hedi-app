import {
  IAppStyled,
  IEntity,
  IEntityLocalized,
  ILanguage,
} from "@/modules/model";

interface INav {
  links?: IEntity[];
}

export interface IShellProps
  extends Partial<IAppStyled>,
    Pick<IPageConfig, "useBreadCrumb" | "revalidate" | "useHeader"> {
  languageSwitchLinks: IEntity[];
  header?: INav;
  footer?: IEntity[];
}

export interface IPageConfig extends Partial<IAppStyled> {
  translations?: IEntityLocalized[];
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
