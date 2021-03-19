import { IsIHTTPError } from "@/modules/common/error";
import { Button, Form, InlineNotification } from "carbon-components-react";
import { FormEvent, useState } from "react";
import { useRegister } from "../../request";
import { IRegisterInfo, IRegistrationView } from "../../types";
import { RegisterInputs } from "../RegisterInputs";

export const RegisterForm = (
  {
    eagerValidate,
  }: {
    eagerValidate?: boolean;
  },
  content: IRegistrationView
) => {
  const [info, setInfo] = useState<IRegisterInfo>();
  const [commit, setCommit] = useState(false);
  const { data, error } = useRegister(
    eagerValidate && info ? { ...info, commit } : {}
  );
  const response = data && !IsIHTTPError(data) ? data : undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCommit(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {response?.error?.generic && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={response.error.generic}
        />
      )}
      <RegisterInputs
        onChange={setInfo}
        errors={response?.error}
        content={content}
      />

      <Button type="submit" size="field">
        Submit
      </Button>
    </Form>
  );
};
