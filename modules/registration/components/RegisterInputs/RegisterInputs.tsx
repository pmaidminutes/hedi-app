import { getTextInputProps, tryGetValue } from "@/modules/common/utils";
import { IUIElementTexts } from "@/modules/model";
import { useTextInput } from "@/modules/react/hooks";
import { Button, TextInput } from "carbon-components-react";
import { useEffect, useState } from "react";
import { IRegisterError, IRegisterInfo } from "../../types";

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
  const [credentialError, setCredentialError] = useState(true);
  //const [mail, setMail] = useTextInput();
  const [pass, setPass] = useTextInput();

  useEffect(() => {
    if (onChange && (name || pass)) {
      onChange({ name, pass });
      setCredentialError(false);
    }
  }, [name, pass]);
  useEffect(() => {
    setCredentialError(true);
  }, [errors]);
  return (
    <>
      <TextInput
        {...getTextInputProps("name", elements)}
        required
        onChange={setName}
        autoComplete="off"
        invalid={credentialError && !!errors?.name}
        //invalidText={errors?.name}
      />
      <TextInput
        {...getTextInputProps("pass", elements)}
        type="password"
        required
        onChange={setPass}
        invalid={credentialError && !!errors?.pass}
        //invalidText={errors?.pass}
      />
      <Button type="submit" size="field">
        {tryGetValue("submit", elements)}
      </Button>
    </>
  );
};
