import { ILoginView } from "@/modules/login/types";
import { useLoginForm } from "./useLoginForm";

import {
  Button,
  Form,
  InlineLoading,
  TextInput,
  ToastNotification,
} from "carbon-components-react";

export type LoginFormProps = Pick<ILoginView, "elements" | "lang"> & {
  redirectUrl?: string;
};

export const LoginForm = (props: LoginFormProps) => {
  const {
    usernameInput,
    passwordInput,
    submitButtonText,
    handleSubmit,
    loginLoading,
    loginNotification,
    successNotification,
  } = useLoginForm(props);

  return (
    <Form onSubmit={handleSubmit}>
      <TextInput type="text" {...usernameInput} />

      <TextInput type="password" {...passwordInput} />

      {loginNotification && (
        <ToastNotification
          kind="error"
          lowContrast={true}
          hideCloseButton={true}
          style={{ width: "100%" }}
          {...loginNotification}
        />
      )}

      {successNotification && (
        <ToastNotification
          kind="success"
          lowContrast={true}
          hideCloseButton={true}
          style={{ width: "100%" }}
          {...successNotification}
          caption={<InlineLoading status="active" />}
        />
      )}
      {!successNotification && (
        <Button type="submit">
          {loginLoading ? <InlineLoading status="active" /> : submitButtonText}
        </Button>
      )}
    </Form>
  );
};
