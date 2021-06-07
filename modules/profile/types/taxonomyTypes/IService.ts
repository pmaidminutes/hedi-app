import { IProfileTaxonomy, ProfileTaxonomyFields } from "./IProfileTaxonomy";
import { IProfession, ProfessionFields } from "./IProfession";

export interface IService extends IProfileTaxonomy {
  professions: IProfession[];
}

export const ServiceFields = `${ProfileTaxonomyFields}
professions { ${ProfessionFields} }
`;
