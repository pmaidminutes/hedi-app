import { ChangeEvent, useEffect, useState } from "react";

export function useValidation<T>(
  value: T,
  isActive: boolean,
  validateFn: (T: any) => boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  const [hasErrors, setHasErrors] = useState(
    isActive ? validateFn(value) : false
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (isActive) {
      setHasErrors(!validateFn(e.target.value));
    }
  };

  return { hasErrors, handleChange };
}
