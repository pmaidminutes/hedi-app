import { IEntity, IUIElementTexts } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IPageConfig } from "@/modules/shell/types";
import { ICaregiver, IMidwife, IOrganisation } from ".";

export type ProfileType = "Caregiver" | "Midwife" | "Organisation";

export const ProfileTypeNameArray = [
  "Caregiver",
  "Midwife",
  "Organisation",
];

export type Profile = ICaregiver | IMidwife | IOrganisation;

export type ProfileView = IProfileDefinition & Profile & IPageConfig;

export interface IProfileDefinition {
  elements: IUIElementTexts[];
  links: (IEntity & IWithKey)[];
}
