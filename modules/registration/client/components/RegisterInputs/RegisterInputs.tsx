import { getTextInputProps, getUIElementValue } from "@/modules/common/utils";
import { IUIElementTexts } from "@/modules/model";
import { useTextInput } from "@/modules/react/hooks";
import { Button, TextInput } from "carbon-components-react";
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
      <TextInput
        {...getTextInputProps("name", elements)}
        required
        onChange={setName}
        autoComplete="off"
        invalid={isCheckCredentialError && !!errors?.name}
        //invalidText={errors?.name}
      />
      <TextInput
        {...getTextInputProps("pass", elements)}
        type="password"
        required
        onChange={setPass}
        invalid={isCheckCredentialError && !!errors?.pass}
        //invalidText={errors?.pass}
      />
      <Button type="submit" size="field">
        {getUIElementValue("submit", elements)}
      </Button>
    </>
  );
};
