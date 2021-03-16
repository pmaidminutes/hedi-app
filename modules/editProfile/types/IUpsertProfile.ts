import { EditProfileFields, IEditProfile } from "./IEditProfile";

export interface IUpsertProfile {
  success: boolean;
  errors?: { [key: string]: string };
  profile?: IEditProfile;
}

export const UpsertProfileFields = `
success 
errors
profile { ${EditProfileFields} }
`;
