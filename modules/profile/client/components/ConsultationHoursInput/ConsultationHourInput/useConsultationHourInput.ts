import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IConsultationHourInput } from "../../../../types";

export const useConsultationHourInput = (
  initialConsultationHourInput: Partial<IConsultationHourInput>,
  onChange?: (consultationHourInput: Partial<IConsultationHourInput>) => void
) => {
  const parsers: IConverterMap<IConsultationHourInput> = {
    weekday: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
    startTime: null,
    endTime: null,
    availability: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
  };

  return useCombinedInputs(parsers, initialConsultationHourInput, onChange);
};
