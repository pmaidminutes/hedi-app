import { IConsultationHourInput } from "@/modules/profile/types";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";

export const useConsultationHourInput = (
  initialConsultationHourInput?: Partial<IConsultationHourInput>,
  onChange?: (consultationHourInput: Partial<IConsultationHourInput>) => void
) => {
  const parsers: IConverterMap<IConsultationHourInput> = {
    weekday: e => (e.value ? parseInt(e.value) : undefined),
    startTime: null,
    endTime: null,
    availability: e => (e.value ? parseInt(e.value) : undefined),
  };

  return useCombinedInputs(parsers, initialConsultationHourInput, onChange);
};
