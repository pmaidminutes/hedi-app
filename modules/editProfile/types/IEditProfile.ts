import { IProfile } from "@/modules/model/IProfile";

export interface IEditProfile
  extends Omit<
    IProfile,
    | "county"
    | "displayAddress"
    | "displayName"
    | "district"
    | "lat"
    | "lat_approx"
    | "long"
    | "long_approx"
    | "state"
    | "translations"
    | "route"
    | "label"
    | "type"
    | "lang"
    | "county"
    | "country"
  > {
  first_pregnancy: boolean;
  profile_type: string;
}
