import { IProfile } from "@/modules/model/IProfile";

export interface IEditProfileError extends IProfile {
  generic?: string;
}

export const EditProfileErrorFields = `generic name mail pass`;
