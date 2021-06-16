import { IValidatedTextInputProps } from "@/modules/components/types";
import { requiredValidationFn } from "@/modules/react/validation";

export function transformValidatedTextInput(props: IValidatedTextInputProps) {
  const {
    required,
    onChange,
    onValidation,
    enableValidation,
    validateFn,
    ...rest
  } = props;

  const validateFunction = validateFn || requiredValidationFn();
  const enableValidationOrDefault = enableValidation ?? true;
  const value = rest.value || "";

  return {
    value,
    validateFunction,
    enableValidationOrDefault,
    onChange,
    onValidation,
    ...rest,
  };
}
