import { IProfileTaxonomy, ProfileTaxonomyFields } from "./IProfileTaxonomy";

export interface IIndexedProfileTaxonomy extends IProfileTaxonomy {
  index: number;
}

export const IndexedProfileTaxonomyFields = `
${ProfileTaxonomyFields}
index
`;
