import { IEntity, IUIElementTexts } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IPageConfig } from "@/modules/shell/types";
import { ICaregiver, IInstitution, IMidwife, IOrganisation } from ".";

export type ProfileType =
  | "Caregiver"
  | "Midwife"
  | "Organisation"
  | "Institution";

export const ProfileTypeNameArray = [
  "Caregiver",
  "Midwife",
  "Organisation",
  "Institution",
];

export type Profile = ICaregiver | IMidwife | IOrganisation | IInstitution;

export type ProfileView = IProfileDefinition & Profile & IPageConfig;

export interface IProfileDefinition {
  elements: IUIElementTexts[];
  links: (IEntity & IWithKey)[];
}
