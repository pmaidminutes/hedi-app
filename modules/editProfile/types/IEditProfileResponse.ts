import { IProfile } from "@/modules/model/IProfile";
import { IEditProfileError, EditProfileErrorFields } from "./IEditProfileError";

export interface IEditProfileResponse {
  success: boolean;
  errors?: IEditProfileError;
  profile?: IProfile;
}

export const EditProfileResponseFields = `success error { ${EditProfileErrorFields} }`;
