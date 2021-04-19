import {
  TextInputProps,
  TextInput,
  InlineNotification,
} from "carbon-components-react";
import React from "react";
import { useValidation } from "../hooks/useValidation";

export const ValidatedTextInput = (
  props: TextInputProps & {
    isNotActive: boolean;
    validateFn: (T: any) => boolean;
  }
) => {
  const { onChange, ...rest } = props;

  const { hasErrors, handleChange } = useValidation(
    props.value ?? "",
    !props.isNotActive,
    props.validateFn,
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
