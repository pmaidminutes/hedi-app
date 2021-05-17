import { IConsultationHoursEntry } from "@/modules/editProfile/types";
import { useEffect, useState } from "react";

export const useConsultationHoursSelection = (
  data?: IConsultationHoursEntry[]
) => {
  const [consultationHoursEntries, setConsultationHoursEntries] = useState(
    data ?? [] //TODO
  );
  const [isMobileContext, setIsMobileContext] = useState(false);

  useEffect(() => {
    setConsultationHoursEntries(data ?? []);
  }, [data]);

  const handleAddClick = () => {
    setConsultationHoursEntries(p => [
      ...p,
      { timeEnd: "0", timeStart: "0", day: "0" },
    ]);
  };

  const handleRemoveClick = (i: number) => {
    setConsultationHoursEntries(p => {
      p.splice(i, 1);
      return [...p];
    });
  };

  const handleItemChange = (i: number, data: IConsultationHoursEntry) => {
    setConsultationHoursEntries(previous => {
      previous[i] = data;
      return [...previous];
    });
  };

  return {
    consultationHoursEntries,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  };
};
