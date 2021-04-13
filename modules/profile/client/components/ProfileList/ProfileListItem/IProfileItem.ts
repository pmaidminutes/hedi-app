import { IUIElementTexts } from "@/modules/model";
import { Profile } from "@/modules/profile/types";
export interface IProfileItem {
  profile: Profile;
  elements: IUIElementTexts[];
}
