import { IProfile } from "@/modules/model/IProfile";

export interface IEditProfileRequest extends IProfile {
  commit?: boolean;
}
