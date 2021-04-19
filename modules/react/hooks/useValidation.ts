import { ChangeEvent, useState } from "react";

export function useValidation<T>(
  value: T,
  isActive: boolean,
  validateFn: (T: any) => boolean
) {
  const [hasErrors, setHasErrors] = useState(false);
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const result = e.target.value as any;
    if (isActive) {
      setHasErrors(!validateFn(e.target.value));
    }
  }
  return { hasErrors, handleChange };
}
