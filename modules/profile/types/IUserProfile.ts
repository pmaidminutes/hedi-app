import { IPersonal, IPersonalInput, PersonalGQL } from "./IPersonal";
import {
  IProfessional,
  IProfessionalInput,
  ProfessionalGQL,
} from "./IProfessional";

export type IUserProfile = IPersonal | IProfessional;

export const UserProfileGQL = `
${PersonalGQL}
${ProfessionalGQL}
`;

export type IUserProfileInput = IPersonalInput | IProfessionalInput;
