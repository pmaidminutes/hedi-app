import { getUser, login } from "@/modules/auth/client";
import {
  Button,
  Form,
  FormProps,
  TextInput,
  TextInputProps,
  ToastNotification,
} from "carbon-components-react";
import { FormEventHandler, useState } from "react";

export interface ILoginFormLayoutProps extends FormProps {
  usernameInput: TextInputProps;
  passwordInput: TextInputProps;
  submitButtonText: string;
  backButtonText: string;
  invalidUserText: string;
}

export const LoginFormLayout = ({
  usernameInput,
  passwordInput,
  submitButtonText,
  invalidUserText,
}: ILoginFormLayoutProps) => {
  const [user, loading] = getUser();
  const [message, setMessage] = useState(false);
  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
    } = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };
    login(username, password);
    if (!loading) {
      setMessage(true);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        {message && !user ? (
          <ToastNotification
            kind="error"
            lowContrast={true}
            title="Error"
            caption={invalidUserText}
            hideCloseButton={true}
            style={{ minWidth: "50rem", marginBottom: ".5rem" }}
          />
        ) : (
          ""
        )}
        <TextInput type="text" {...usernameInput} />

        <TextInput type="password" {...passwordInput} />

        <Button type="submit">{submitButtonText}</Button>
      </Form>
    </>
  );
};
