import { getTextInputProps } from "@/modules/common/utils";
import { IUIElementTexts } from "@/modules/model";
import { useTextInput } from "@/modules/react/hooks";
import { Button, TextInput } from "carbon-components-react";
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
  //const [mail, setMail] = useTextInput();
  const [pass, setPass] = useTextInput();
  useEffect(() => {
    if (onChange && (name || pass)) {
      onChange({ name, pass });
    }
  }, [name, pass]);

  return (
    <>
      <TextInput
        {...getTextInputProps("name", elements)}
        required
        onChange={setName}
        autoComplete="off"
        invalid={!!errors?.name}
        //invalidText={errors?.name}
      />
      <TextInput
        {...getTextInputProps("pass", elements)}
        type="password"
        required
        onChange={setPass}
        invalid={!!errors?.pass}
        //invalidText={errors?.pass}
      />
      <Button type="submit" size="field">
        {elements.find(e => e.identifier === "submit")?.value}
      </Button>
    </>
  );
};
