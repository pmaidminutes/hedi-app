import React from "react";
import { NumberInput } from "../NumberInput";
import { requiredValidationFn } from "@/modules/react/validation";
import { IValidatedNumberInputProps } from "@/modules/components/types/ValidatedNumberInput";
import { useValidation } from "@/modules/react/hooks";

export const ValidatedNumberInput = React.forwardRef<
  HTMLInputElement,
  IValidatedNumberInputProps
>((props, ref) => {
  const {
    onChange,
    onValidation,
    enableValidation,
    validateFn,
    ...rest
  } = props;

  const validateFunction = validateFn || requiredValidationFn();
  const setDefaultEnableValidation = enableValidation ?? true;

  const { handleChange } = useValidation(
    rest.value ?? "",
    validateFunction,
    setDefaultEnableValidation,
    onChange,
    onValidation
  );
  return <NumberInput onChange={handleChange} ref={ref} {...rest} />;
});
