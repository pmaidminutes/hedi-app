import {
  IIndexedProfileTaxonomy,
  IndexedProfileTaxonomyFields,
} from "./IIndexedProfileTaxonomy";

export interface IWeekday extends IIndexedProfileTaxonomy {
  abbreviation: string;
}

export const WeekdayFields = `${IndexedProfileTaxonomyFields}
abbreviation
`;
