import { IEntity } from "@/modules/model";

interface INav {
  links: IEntity[];
}

export interface IShellProps extends INav {
  languageSwitchLinks: IEntity[];
}
