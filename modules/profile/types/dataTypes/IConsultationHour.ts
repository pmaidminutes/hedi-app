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

export interface IConsultationHourInput {
  weekday: number;
  startTime?: string;
  endTime?: string;
  availability: number;
}

export const ConsultationHourInputDefault: IConsultationHourInput = {
  weekday: 0,
  availability: 0,
};

export function consultationHourToInput(
  consultationHour: IConsultationHour
): IConsultationHourInput {
  const { weekday, startTime, endTime, availability } = consultationHour;
  return {
    weekday: weekday.index,
    startTime,
    endTime,
    availability: availability.index,
  };
}
