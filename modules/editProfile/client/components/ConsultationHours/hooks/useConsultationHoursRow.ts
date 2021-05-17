import { IConsultationHoursEntry } from "@/modules/editProfile/types";
import { OnChangeData } from "carbon-components-react";
import { useEffect, useState } from "react";

export const useConsultationHoursRow = (
  data: IConsultationHoursEntry,
  onChange?: (data: IConsultationHoursEntry) => void
) => {
  const [consultationHours, setConsultationHours] = useState(data);

  useEffect(() => {
    setConsultationHours(data);
  }, [data]);

  const handleDaysChange = (e: OnChangeData<string>) => {
    const day = e.selectedItem;
    if (day) {
      setConsultationHours(p => {
        const newValue = { ...p, day: day };
        if (onChange) onChange(newValue);
        return newValue;
      });
    }
  };

  const handleTimeStartChange = (e: OnChangeData<string>) => {
    const timeStrat = e.selectedItem;
    if (timeStrat) {
      setConsultationHours(p => {
        const newValue = { ...p, timeStart: timeStrat };
        if (onChange) onChange(newValue);
        return newValue;
      });
    }
  };
  const handleTimeEndChange = (e: OnChangeData<string>) => {
    const timeEnd = e.selectedItem;
    if (timeEnd) {
      setConsultationHours(p => {
        const newValue = { ...p, timeEnd: timeEnd };
        if (onChange) onChange(newValue);
        return newValue;
      });
    }
  };
  return {
    consultationHours,
    handleDaysChange,
    handleTimeStartChange,
    handleTimeEndChange,
  };
};
