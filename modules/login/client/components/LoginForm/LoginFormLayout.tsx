import { getUser } from "@/modules/auth/client";
import {
  Button,
  Form,
  FormProps,
  TextInput,
  TextInputProps,
  ToastNotification,
} from "carbon-components-react";

export interface ILoginFormLayoutProps extends FormProps {
  usernameInput: TextInputProps;
  passwordInput: TextInputProps;
  submitButtonText: string;
  backButtonText: string;
}

export const LoginFormLayout = ({
  usernameInput,
  passwordInput,
  submitButtonText,
  backButtonText,
  ...formProps
}: ILoginFormLayoutProps) => {
  const [user, loading] = getUser();
  return (
    <>
      <Form {...formProps}>
        {/*  {!(user)?
      <ToastNotification
          kind="error"
          lowContrast={true}
          title="Error"
          caption="Invalid information" 
          hideCloseButton={true}
          style={{ minWidth: "50rem", marginBottom: ".5rem" }}
        />:""} */}
        <TextInput type="text" {...usernameInput} />

        <TextInput type="password" {...passwordInput} />

        <Button type="submit">{submitButtonText}</Button>
      </Form>
    </>
  );
};
