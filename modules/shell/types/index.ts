import {
  IEntity,
} from "@/modules/model";

interface IFooter extends Partial<INav> {
  languageSwitch?: string;
}
interface INav {
  links: IEntity[];
}

export interface IShellProps extends INav {
  languageSwitchLinks: IEntity[];
}
