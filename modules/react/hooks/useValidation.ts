import { ChangeEvent, useEffect, useState } from "react";

export function useValidation<T>(
  value: T,
  validateFn: ((T: any) => boolean) | Array<(T: any) => boolean>,
  enableValidation?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onValidation?: (textError: string) => void
) {
  const isInvalid = (value: any) =>
    Array.isArray(validateFn)
      ? !!validateFn.filter(fn => !fn(value)).length
      : !validateFn(value);

  const [hasErrors, setHasErrors] = useState(
    enableValidation ? isInvalid(value) : false
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (onChange) onChange(e);
    if (enableValidation) {
      const hasValidationError = isInvalid(inputValue);
      setHasErrors(hasValidationError);
      if (onValidation)
        onValidation(hasValidationError ? "---- Error ----" : ""); // TODO set real error text
    }
  };
  return { handleChange };
}
