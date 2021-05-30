import {
  IAvailability,
  AvailabilityFields,
  IWeekday,
  WeekdayFields,
} from "../taxonomyTypes";

export interface IConsultationHour {
  weekday: IWeekday;
  startTime?: string;
  endTime?: string;
  availability: IAvailability;
}

export const ConsultationHourFields = `
weekday { ${WeekdayFields} }
startTime endTime
availability { ${AvailabilityFields} }
`;
