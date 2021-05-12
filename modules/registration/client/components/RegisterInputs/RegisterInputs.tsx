import { getTextInputProps, getUIElementValue } from "@/modules/common/utils";
import { IUIElementTexts } from "@/modules/model";
import { useTextInput } from "@/modules/react/hooks";
import {
  maxLengthValidationFn,
  minLengthValidationFn,
  requiredValidationFn,
  ValidatedTextInput,
  useValidationSummary,
  ValidationSummary,
} from "@/modules/react/validation";
import { Button } from "carbon-components-react";
import React from "react";
import { IRegisterError, IRegisterInfo } from "../../../types";
import { useCredentialChange } from "../../hooks";

type RegisterInputProps = {
  errors?: IRegisterError;
  onChange?: (info: IRegisterInfo) => void;
  elements: IUIElementTexts[];
};

export const RegisterInputs = ({
  errors,
  onChange,
  elements,
}: RegisterInputProps) => {
  const [name, setName] = useTextInput();
  const { validationErrors, setValidationError } = useValidationSummary();
  //const [mail, setMail] = useTextInput();
  const [pass, setPass] = useTextInput();
  const { isCheckCredentialError } = useCredentialChange(
    name,
    pass,
    errors,
    onChange
  );

  return (
    <>
      <ValidatedTextInput
        {...getTextInputProps("name", elements)}
        required
        onChange={setName}
        autoComplete="off"
        invalid={isCheckCredentialError && !!errors?.name}
        enableValidation
        onValidation={texterror => setValidationError("name", texterror)}
        validateFn={requiredValidationFn()}
        //invalidText={errors?.name}
      />

      <ValidatedTextInput
        {...getTextInputProps("pass", elements)}
        type="password"
        required
        onChange={setPass}
        invalid={isCheckCredentialError && !!errors?.pass}
        enableValidation
        onValidation={texterror => setValidationError("pass", texterror)}
        validateFn={requiredValidationFn()}
        //invalidText={errors?.pass}
      />
      <ValidationSummary validationErrors={validationErrors} />
      <Button type="submit" size="field">
        {getUIElementValue("submit", elements)}
      </Button>
    </>
  );
};
