export interface IUpsertProfile {
  consultation_hours?: string;
  first_pregnancy?: boolean;
  city?: string;
  forename?: string;
  house_number?: string;
  mail?: string;
  phone?: string;
  phone_private?: string;
  postal_code?: string;
  prefix?: string;
  profile_type?: string;
  room?: string;
  street?: string;
  suffix?: string;
  surname?: string;
  website?: string;
}

export const implementsIUpsertProfile = (obj: any) => !!(obj && obj.profile);

export function isIUpsertProfile(obj: any): obj is IUpsertProfile {
  return implementsIUpsertProfile(obj);
}

export const UpsertProfileFieldArray = [
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
  "profile_type",
  "room",
  "street",
  "suffix",
  "surname",
  "website",
] as const;

export const UpsertProfileFields = ` 
  profile {
    ${UpsertProfileFieldArray.join(" ")}
  }
   `;
