import { FormEvent, useEffect, useState } from "react";
import { Form, Button, InlineNotification } from "carbon-components-react";
import { RegisterInputs } from "../RegisterInputs";
import { IRegisterInfo } from "../../types";
import { useRegister } from "../../request";
import { IsIHTTPError } from "@/modules/common/error";

export const RegisterForm = ({
  eagerValidate,
}: {
  eagerValidate?: boolean;
}) => {
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
      <RegisterInputs onChange={setInfo} errors={response?.error} />

      <Button type="submit" size="field">
        Submit
      </Button>
    </Form>
  );
};
