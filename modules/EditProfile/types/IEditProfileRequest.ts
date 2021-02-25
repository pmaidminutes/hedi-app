import { IEditProfileInfo } from "./IEditProfileInfo";

export interface IEditProfileRequest extends IEditProfileInfo {
  commit?: boolean;
}
