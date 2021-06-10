import { ErrorMap } from "@/modules/model";
import { useState } from "react";

export const useValidationSummary = () => {
  const [validationErrors, setValidationErrors] = useState<ErrorMap>({});
  const setValidationError = (fieldName: string, errorText: string) => {
    if (errorText)
      setValidationErrors(previous => ({
        ...previous,
        [fieldName]: errorText,
      }));
    else {
      setValidationErrors(previous => {
        const { [fieldName]: _, ...rest } = previous;
        return { ...rest };
      });
    }
  };
  return { validationErrors, setValidationError };
};
