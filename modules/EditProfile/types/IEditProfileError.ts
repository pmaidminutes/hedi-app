import { IEditProfileInfo } from "./IEditProfileInfo";

export interface IEditProfileError extends IEditProfileInfo {
  generic?: string;
}

export const EditProfileErrorFields = `generic name mail pass`;
