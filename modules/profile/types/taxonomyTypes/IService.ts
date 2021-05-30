import { IProfileTerm, ProfileTermFields } from "./IProfileTerm";
import { IProfession, ProfessionFields } from "./IProfession";

export interface IService extends IProfileTerm {
  professions: IProfession[];
}

export const ServiceFields = `${ProfileTermFields}
professions { ${ProfessionFields} }
`;
