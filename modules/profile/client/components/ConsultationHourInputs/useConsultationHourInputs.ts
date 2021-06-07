import {
  consultationHourToInput,
  IConsultationHour,
  IConsultationHourInput,
} from "@/modules/profile/types";
import { useEffect, useState } from "react";

export const useConsultationHourInputs = (
  consultationHours?: IConsultationHour[]
) => {
  const [consultationHourInputs, setConsultationHourInputs] = useState(
    consultationHours?.map(ch => consultationHourToInput(ch)!) ?? []
  );

  useEffect(() => {
    setConsultationHourInputs(
      consultationHours?.map(ch => consultationHourToInput(ch)!) ?? []
    );
  }, [consultationHours]);

  const handleAddClick = () => {
    setConsultationHourInputs(p => [...p, { weekday: 0, availability: 0 }]);
  };

  const handleRemoveClick = (i: number) => {
    setConsultationHourInputs(p => {
      p.splice(i, 1);
      return [...p];
    });
  };

  const handleItemChange = (
    i: number,
    consultationHourInput: IConsultationHourInput
  ) => {
    setConsultationHourInputs(previous => {
      previous[i] = consultationHourInput;
      return [...previous];
    });
  };

  return {
    consultationHourInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  };
};
