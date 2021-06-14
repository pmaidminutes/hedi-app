import React from "react";
import { TextInput } from "../TextInput";
import { IValidatedTextInputProps } from "@/modules/components/types";
import { requiredValidationFn } from "@/modules/react/validation";
import { useValidation } from "@/modules/react/hooks";

export const ValidatedTextInput = React.forwardRef<
  HTMLInputElement,
  IValidatedTextInputProps
>((props, ref) => {
  const {
    onChange,
    onValidation,
    enableValidation,
    validateFn,
    ...rest
  } = props;

  const validateFunction = validateFn || requiredValidationFn();
  const enableValidationOrDefault = enableValidation ?? true;

  const { handleChange } = useValidation(
    rest.value ?? "",
    validateFunction,
    enableValidationOrDefault,
    onChange,
    onValidation
  );
  return <TextInput onChange={handleChange} ref={ref} {...rest} />;
});
