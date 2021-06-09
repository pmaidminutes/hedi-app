import React from "react";
import { TextInput } from ".";
import { ITextInputProps } from "./transformTextInput";
import { IValidationFunction } from "./Validation";
import { useValidation } from "./Validation/hook/useValidation";

interface IValidatedTextInputProps extends ITextInputProps {
  validateFn: IValidationFunction | IValidationFunction[];
  enableValidation?: true;
  onValidation?: (textError: string) => void;
}
export const ValidationTextInput = React.forwardRef<
  HTMLInputElement,
  IValidatedTextInputProps
>((props, ref) => {
  const { onChange, onValidation, enableValidation, ...rest } = props;

  const { handleChange } = useValidation(
    rest.value ?? "",
    rest.validateFn,
    enableValidation,
    onChange,
    onValidation
  );
  return <TextInput onChange={handleChange} ref={ref} {...props} />;
});
