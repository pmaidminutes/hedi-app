import { IPersonal, PersonalGQL } from "./IPersonal";
import { IProfessional, ProfessionalGQL } from "./IProfessional";

export type IUserProfile = IPersonal | IProfessional;

export const UserProfileGQL = `
${PersonalGQL}
${ProfessionalGQL}
`;
