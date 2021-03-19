import { IProfile } from "@/modules/model/IProfile";
import { ILanguageSkillEntry } from "./ILanguageSkillEntry";

export interface IEditProfile
  extends Omit<
    IProfile,
    | "county"
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
  type: string;
  languageSkills: ILanguageSkillEntry[];
  first_pregnancy: boolean;
  domains: string[];
}

export const EditProfileFieldArray: (keyof IEditProfile)[] = [
  "type",

  "displayName",
  "prefix",
  "forename",
  "surname",
  "suffix",

  "displayAddress",
  "city",
  "postal_code",
  "street",
  "house_number",
  "room",

  "phone",
  "phone_private",
  "mail",
  "website",
  "consultation_hours",

  "languageSkills",

  "first_pregnancy",
  "domains",
];

export const EditProfileFields = `${EditProfileFieldArray.join(" ").replace(
  "languageSkills",
  "languageSkills { langcode level }"
)}`;

export type EditProfileInput = Partial<IEditProfile>;
