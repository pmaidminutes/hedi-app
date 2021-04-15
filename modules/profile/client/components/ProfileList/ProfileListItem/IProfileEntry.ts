import { IUIElementTexts } from "@/modules/model";
import { Profile } from "@/modules/profile/types";
export interface IProfileEntry {
  profile: Profile;
  elements: IUIElementTexts[];
}
