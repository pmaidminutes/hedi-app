import {
  TextInputProps,
  TextInput,
  InlineNotification,
} from "carbon-components-react";
import React from "react";
import { useValidation } from "../hooks/useValidation";

export const ValidatedTextInput = (
  props: TextInputProps & { validateFn: (T: any) => boolean }
) => {
  const { hasErrors, handleChange } = useValidation(
    props.value,
    // TODO :Ich muss fragen, wie der Ischecksparameter nimmt
    props.required ? true : false,
    props.validateFn
  );
  return (
    <>
      <TextInput onChange={handleChange} {...props} />
      //TODO: TextError
      {hasErrors && (
        <InlineNotification kind="error" title="Error" subtitle={""} />
      )}
    </>
  );
};
export default ValidatedTextInput;
