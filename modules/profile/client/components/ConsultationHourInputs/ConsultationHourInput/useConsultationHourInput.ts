import { IConsultationHourInput } from "@/modules/profile/types";
import { ChangeEvent, useEffect, useState } from "react";

export const useConsultationHourInput = (
  initialConsultationHourInput?: IConsultationHourInput,
  onChange?: (consultationHourInput: IConsultationHourInput) => void
) => {
  const [consultationHourInput, setConsultationHourInput] = useState(
    initialConsultationHourInput
  );

  useEffect(() => {
    setConsultationHourInput(initialConsultationHourInput);
  }, [initialConsultationHourInput]);

  const handleWeekdayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const weekdayString = e.target.value;
    const weekday = weekdayString ? parseInt(weekdayString) : undefined;
    if (weekday) {
      setConsultationHourInput(p => {
        const newValue = p ? { ...p, weekday } : { weekday, availability: 0 };
        if (onChange) onChange(newValue);
        return newValue;
      });
    }
  };

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const startTime = e.target.value;
    if (startTime) {
      setConsultationHourInput(p => {
        const newValue = p
          ? { ...p, startTime }
          : { weekday: 0, startTime, availability: 0 };
        if (onChange) onChange(newValue);
        return newValue;
      });
    }
  };
  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const endTime = e.target.value;
    if (endTime) {
      setConsultationHourInput(p => {
        const newValue = p
          ? { ...p, endTime }
          : { weekday: 0, endTime, availability: 0 };
        if (onChange) onChange(newValue);
        return newValue;
      });
    }
  };

  const handleAvailabilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const availabilityString = e.target.value;
    const availability = availabilityString
      ? parseInt(availabilityString)
      : undefined;
    if (availability) {
      setConsultationHourInput(p => {
        const newValue = p
          ? { ...p, availability }
          : { weekday: 0, availability };
        if (onChange) onChange(newValue);
        return newValue;
      });
    }
  };
  return {
    consultationHourInput,
    handleWeekdayChange,
    handleStartTimeChange,
    handleEndTimeChange,
    handleAvailabilityChange,
  };
};
