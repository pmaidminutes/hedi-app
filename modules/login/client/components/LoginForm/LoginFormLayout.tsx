import {
  Button,
  Form,
  FormProps,
  TextInput,
  TextInputProps,
} from "carbon-components-react";

export interface ILoginFormLayoutProps extends FormProps {
  usernameInput: TextInputProps;
  passwordInput: TextInputProps;
  submitButtonText: string;
}

export const LoginFormLayout = ({
  usernameInput,
  passwordInput,
  submitButtonText,
  ...formProps
}: ILoginFormLayoutProps) => {
  return (
    <Form {...formProps}>
      <TextInput type="text" {...usernameInput} />
      <TextInput type="password" {...passwordInput} />
      <Button type="submit">{submitButtonText}</Button>
    </Form>
  );
};
