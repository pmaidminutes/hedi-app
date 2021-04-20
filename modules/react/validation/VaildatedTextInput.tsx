import {
  TextInputProps,
  TextInput,
  InlineNotification,
} from "carbon-components-react";
import React from "react";
import { useValidation } from "../hooks/useValidation";

export const ValidatedTextInput = (
  props: TextInputProps & {
    validateFn: (T: any) => boolean;
    enableValidation: true;
  }
) => {
  const { onChange, ...rest } = props;

  const { hasErrors, handleChange } = useValidation(
    rest.value ?? "",
    rest.enableValidation,
    rest.validateFn,
    onChange
  );
  //TODO: notification error text: use current language
  return (
    <>
      <TextInput onChange={handleChange} {...rest} />
      {hasErrors && (
        <InlineNotification kind="error" title="Error" subtitle={""} />
      )}
    </>
  );
};
export default ValidatedTextInput;
