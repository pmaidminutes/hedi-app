import { IEditProfileError, EditProfileErrorFields } from "./IEditProfileError";
import { IProfile } from "./IEditProfileInfo";

export interface IEditProfileResponse {
  success: boolean;
  errors?: IEditProfileError;
  profile?: IProfile
}

export const EditProfileResponseFields = `success error { ${EditProfileErrorFields} }`;
