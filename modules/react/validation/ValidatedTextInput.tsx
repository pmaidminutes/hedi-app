import React from "react";
import { TextInput } from "@/modules/components";
import { IValidationFunction } from ".";
import { useValidation } from "../hooks/useValidation";
import { ITextInputProps } from "@/modules/components/client/components/TextInput/transformTextInput";

interface IValidatedTextInputProps extends ITextInputProps {
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
