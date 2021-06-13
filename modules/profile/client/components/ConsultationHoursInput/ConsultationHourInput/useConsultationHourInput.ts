import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IConsultationHourInput } from "../../../../types";

export const useConsultationHourInput = (
  initialConsultationHourInput: IConsultationHourInput,
  onChange?: (consultationHourInput: IConsultationHourInput) => void
) => {
  const parsers: IConverterMap<IConsultationHourInput> = {
    weekday: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
    startTime: null,
    endTime: null,
    availability: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
  };

  return useCombinedInputs(parsers, initialConsultationHourInput, onChange);
};
