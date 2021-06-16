import React from "react";
import { NumberInput } from "../NumberInput";
import { IValidatedNumberInputProps } from "@/modules/components/types/ValidatedNumberInput";
import { useValidation } from "@/modules/react/hooks";
import { transformValidatedNumberInput } from "./transformValidatedNumberInput";

export const ValidatedNumberInput = React.forwardRef<
  HTMLInputElement,
  IValidatedNumberInputProps
>((props, ref) => {
  const {
    onChange,
    onValidation,
    value,
    validateFunction,
    setDefaultEnableValidation,
    ...rest
  } = transformValidatedNumberInput(props);

  const { handleChange } = useValidation(
    value,
    validateFunction,
    setDefaultEnableValidation,
    onChange,
    onValidation
  );
  return <NumberInput onChange={handleChange} ref={ref} {...rest} />;
});
