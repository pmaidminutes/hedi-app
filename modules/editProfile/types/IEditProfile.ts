import { IProfile } from "@/modules/model/IProfile";

export interface IEditProfile extends IProfile  {
  first_pregnancy: boolean;
  profile_type : string;
}

