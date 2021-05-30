import { IProfileTerm, ProfileTermFields } from "./IProfileTerm";

export interface IWeekday extends IProfileTerm {
  abbreviation: string;
}

export const WeekdayFields = `${ProfileTermFields}
abbreviation
`;
