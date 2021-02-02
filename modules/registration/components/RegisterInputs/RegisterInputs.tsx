import { useTextInput } from "@/modules/react/hooks";
import { Form, TextInput } from "carbon-components-react";
import { useEffect } from "react";
import { IRegisterError, IRegisterInfo } from "../../types";

type RegisterInputProps = {
  errors?: IRegisterError;
  onChange?: (info: IRegisterInfo) => void;
};

export const RegisterInputs = ({ errors, onChange }: RegisterInputProps) => {
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
        id="name"
        labelText="Username"
        required
        onChange={setName}
        invalid={!!errors?.name}
        invalidText={errors?.name}
      />
      <TextInput
        id="mail"
        labelText="E-Mail"
        required
        onChange={setMail}
        invalid={!!errors?.mail}
        invalidText={errors?.mail}
      />
      <TextInput
        id="pass"
        labelText="Password"
        type="password"
        required
        onChange={setPass}
        invalid={!!errors?.pass}
        invalidText={errors?.pass}
      />
    </>
  );
};
