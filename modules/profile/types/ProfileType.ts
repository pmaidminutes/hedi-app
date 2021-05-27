import { IEntity } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IPageConfig } from "@/modules/shell/types";

export type Profile = any;

export type ProfileView = IProfileDefinition & Profile & IPageConfig;

export interface IProfileDefinition {
  elements: any[];
  links: (IEntity & IWithKey)[];
}
