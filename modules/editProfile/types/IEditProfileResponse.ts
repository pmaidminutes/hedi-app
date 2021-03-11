
import { IEditProfile } from "./IEditProfile";
import { IEditProfileError, EditProfileErrorFields } from "./IEditProfileError";

export interface IEditProfileResponse {
  success: boolean;
  errors?: IEditProfileError;
  profile?: IEditProfile;
}

export const EditProfileResponseFields = `success error { ${EditProfileErrorFields} }`;
