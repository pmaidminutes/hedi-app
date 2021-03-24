import { IAppStyled, IEntity, IEntityLocalized, ILanguage } from "@/modules/model";

interface INav {
  links?: IEntity[];
}

export interface IShellProps extends Partial<IAppStyled>, IPageConfig {
  languageSwitchLinks: IEntity[];
}

export interface IPageConfig extends Partial<IAppStyled> {
  translations?: IEntityLocalized[];
  header?: INav;
  footer?: INav;
  // TODO: Serverseitig
  useBreadCrumb?: boolean;
  revalidate?: boolean | number;
}

// export type shellRecords = "header" | "footer"

export interface IShell extends Record<string, IEntity[]> {
  languages: ILanguage[];
}
