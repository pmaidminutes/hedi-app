import { ChangeEvent, useEffect, useState } from "react";

export function useValidation<T>(
  value: T,
  enableValidation: boolean,
  validateFn: (T: any) => boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  const [hasErrors, setHasErrors] = useState(
    enableValidation ? validateFn(value) : false
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (enableValidation) {
      setHasErrors(!validateFn(e.target.value));
    }
  };

  return { hasErrors, handleChange };
}
