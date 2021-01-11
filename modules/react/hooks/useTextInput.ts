import { ChangeEvent, useState } from "react";

export function useTextInput(defaultText = "") {
  const [value, setValue] = useState(defaultText);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  return [value, handleChange] as const;
}
