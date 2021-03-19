import { useTextInput } from "@/modules/react/hooks";
import { TextInput } from "carbon-components-react";
import { useEffect } from "react";
import { IRegisterError, IRegisterInfo, IRegistrationView } from "../../types";

type RegisterInputProps = {
  errors?: IRegisterError;
  onChange?: (info: IRegisterInfo) => void;
  content: IRegistrationView;
};

export const RegisterInputs = ({
  errors,
  onChange,
  content,
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
        //{...getTextInputProps("name", content?.elements)}
        id="name"
        labelText="Username"
        required
        onChange={setName}
        invalid={!!errors?.name}
        invalidText={errors?.name}
      />

      <TextInput
        // {...getTextInputProps("pass", content?.elements)}
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
