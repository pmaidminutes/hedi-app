import {
  Button,
  Form,
  FormProps,
  TextInput,
  TextInputProps,
  Column,
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
  return (
    <>
      <Form {...formProps}>
        <TextInput type="text" {...usernameInput} />

        <TextInput type="password" {...passwordInput} />

        <Button type="submit">{submitButtonText}</Button>
      </Form>
    </>
  );
};
