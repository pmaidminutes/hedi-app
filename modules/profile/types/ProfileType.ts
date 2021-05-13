import { IEntity, IUIElementTexts } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IPageConfig } from "@/modules/shell/types";
import { ICaregiver, IMidwife } from ".";
import { isICaregiver } from "./CaregiverType";
import { isIMidwife } from "./MidwifeType";

export type ProfileType = "Caregiver" | "Midwife";

export const ProfileTypeNameArray = ["Caregiver", "Midwife"];

export type Profile = ICaregiver | IMidwife;

export function isProfile(obj: any): obj is Profile {
  return isICaregiver(obj) || isIMidwife(obj);
}

export type ProfileView = IProfileDefinition & Profile & IPageConfig;

export interface IProfileDefinition {
  elements: IUIElementTexts[];
  links: (IEntity & IWithKey)[];
}
