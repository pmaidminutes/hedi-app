import { ErrorMap } from "@/modules/model";
import { EditProfileFields, IEditProfile } from "./IEditProfile";

export interface IUpsertProfile {
  success: boolean;
  errors?: ErrorMap;
  profile?: IEditProfile;
  route?: string;
}

export const UpsertProfileFields = `
success 
errors
profile { ${EditProfileFields} }
route
`;
