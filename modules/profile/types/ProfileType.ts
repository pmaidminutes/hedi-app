import { IEntity, IUIElementTexts } from "@/modules/model";
import { IPageConfig } from "@/modules/shell/types";
import { ICaregiver, IInstitution, IMidwife, IOrganisation } from ".";

export type ProfileType =
  | "Parent"
  | "Caregiver"
  | "Midwife"
  | "Organisation"
  | "Institution";

export const ProfileTypeNameArray = [
  "Parent",
  "Caregiver",
  "Midwife",
  "Organisation",
  "Institution",
];

export type Profile = ICaregiver | IMidwife | IOrganisation | IInstitution;

export type ProfileView = IProfileDefinition & Profile & IPageConfig;

export interface IProfileDefinition {
  elements: IUIElementTexts[];
  links: (IEntity & { key: string })[];
}
