import { getTextInputProps } from "@/modules/common/utils";
import { IUIElementTexts } from "@/modules/model";
import { useTextInput } from "@/modules/react/hooks";
import { TextInput } from "carbon-components-react";
import { useEffect } from "react";
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
  const [mail, setMail] = useTextInput();
  const [pass, setPass] = useTextInput();
  useEffect(() => {
    if (onChange && (name || mail || pass)) {
      onChange({ name, mail, pass });
    }
  }, [name, mail, pass]);
  return (
    <>
      <TextInput
        {...getTextInputProps("name", elements)}
        required
        onChange={setName}
        invalid={!!errors?.name}
        invalidText={errors?.name}
      />
      <TextInput
        id={"mail"}
        labelText={"Email"}
        required
        onChange={setMail}
        invalid={!!errors?.mail}
        invalidText={errors?.mail}
      />
      <TextInput
        {...getTextInputProps("pass", elements)}
        type="password"
        required
        onChange={setPass}
        invalid={!!errors?.pass}
        invalidText={errors?.pass}
      />
    </>
  );
};
