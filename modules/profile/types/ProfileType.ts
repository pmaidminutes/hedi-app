import { IEntity, IUIElementTexts } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IPageConfig } from "@/modules/shell/types";
import { ICaregiver, IMidwife } from ".";

export type ProfileType = "Caregiver" | "Midwife";

export const ProfileTypeNameArray = ["Caregiver", "Midwife"];

export type Profile = ICaregiver | IMidwife;

export type ProfileView = IProfileDefinition & Profile & IPageConfig;

export interface IProfileDefinition {
  elements: IUIElementTexts[];
  links: (IEntity & IWithKey)[];
}
