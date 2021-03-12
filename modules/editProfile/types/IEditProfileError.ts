import { IEditProfile } from "./IEditProfile";


export interface IEditProfileError extends IEditProfile {
  generic?: string;
}

export const EditProfileErrorFields = `generic name mail pass`;
