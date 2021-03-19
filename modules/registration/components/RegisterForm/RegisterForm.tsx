import { IsIHTTPError } from "@/modules/common/error";
import { IUIElementTexts } from "@/modules/model";
import { Button, Form, InlineNotification } from "carbon-components-react";
import { FormEvent, useState } from "react";
import { useRegister } from "../../request";
import { IRegisterInfo } from "../../types";
import { RegisterInputs } from "../RegisterInputs";

export const RegisterForm = ({
  elements,
  eagerValidate,
}: {
  elements: IUIElementTexts[];
  eagerValidate?: boolean;
}) => {
  const [info, setInfo] = useState<IRegisterInfo>();
  const [commit, setCommit] = useState(false);
  const { data, error } = useRegister(
    eagerValidate && info ? { ...info, commit } : {}
  );
  const response = data && !IsIHTTPError(data) ? data : undefined;
  if (response) {
    eagerValidate = false;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eagerValidate, "eagervalidate");
    eagerValidate = true;
    setCommit(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {response?.errors?.generic && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={response.errors.generic}
        />
      )}
      <RegisterInputs
        onChange={setInfo}
        errors={response?.errors}
        elements={elements}
      />

      <Button type="submit" size="field">
        Submit
      </Button>
    </Form>
  );
};
