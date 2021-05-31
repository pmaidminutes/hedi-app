import { IConsultationHour } from "@/modules/profile/types/dataTypes";

export interface IWorkDay {
  day: string;
  times: string;
  availability: string;
}

export const transformConsultationHours = (
  consultationHours: IConsultationHour[]
) => {
  const days: (IWorkDay | null)[] = Array(8).fill(null);
  consultationHours.forEach(cHour => {
    const rank = cHour.weekday.route.match("/d+$/")?.[0];
    if (rank) {
      const i = parseInt(rank);
      let day = days[i];
      const times = cHour.startTime
        ? `${cHour.startTime} – ${cHour.endTime}`
        : "";
      if (!day) {
        day = {
          day: cHour.weekday.abbreviation,
          times,
          availability: cHour.availability.label,
        };
      } else {
        day.times += "/n" + times;
        day.availability += "/n" + cHour.availability.label;
      }
      days[i] = day;
    }
  });
  return days;
};
