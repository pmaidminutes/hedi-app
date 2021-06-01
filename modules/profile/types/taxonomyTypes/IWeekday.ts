import { IProfileTaxonomy, ProfileTaxonomyFields } from "./IProfileTaxonomy";

export interface IWeekday extends IProfileTaxonomy {
  abbreviation: string;
}

export const WeekdayFields = `${ProfileTaxonomyFields}
abbreviation
`;
