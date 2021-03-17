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
  type: string;
}

export const EditProfileFieldArray: (keyof IEditProfile)[] = [
  "consultation_hours",
  "first_pregnancy",
  "city",
  "forename",
  "house_number",
  "mail",
  "phone",
  "phone_private",
  "postal_code",
  "prefix",
  "type",
  "room",
  "street",
  "suffix",
  "surname",
  "website",
];

export const EditProfileFields = `${EditProfileFieldArray.join(" ")}`;

export type EditProfileInput = Partial<IEditProfile>;
