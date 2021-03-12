import { IEditProfile } from "./IEditProfile";


export interface IEditProfileRequest extends IEditProfile {
  commit?: boolean;
}
