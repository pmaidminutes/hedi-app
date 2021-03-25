import { EditProfileFields, IEditProfile } from "./IEditProfile";

export interface IUpsertProfile {
  success: boolean;
  errors?: { [key: string]: string };
  profile?: IEditProfile;
  route?: string;
}

export const UpsertProfileFields = `
success 
errors
profile { ${EditProfileFields} }
route
`;
