import React from "react";
import { TextInput } from "../TextInput";
import { useValidation } from "@/modules/validation/client/hooks/useValidation";
import { IValidatedTextInputProps } from "@/modules/components/types";
import { requiredValidationFn } from "@/modules/react/validation";

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

  const { handleChange } = useValidation(
    rest.value ?? "",
    validateFunction,
    enableValidation,
    onChange,
    onValidation
  );
  return <TextInput onChange={handleChange} ref={ref} {...rest} />;
});
