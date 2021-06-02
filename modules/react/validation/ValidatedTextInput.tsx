import { TextInputProps, TextInput } from "carbon-components-react";
import React from "react";
import { IValidationFunction } from ".";
import { useValidation } from "../hooks/useValidation";

interface IValidatedTextInputProps extends TextInputProps {
  validateFn: IValidationFunction | IValidationFunction[];
  enableValidation?: true;
  onValidation?: (textError: string) => void;
}

export const ValidatedTextInput = React.forwardRef<
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

  return <TextInput onChange={handleChange} ref={ref} {...rest} />;
});
export default ValidatedTextInput;