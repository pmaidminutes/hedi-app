import { SkipBack20 } from "@carbon/icons-react";
import {
  Button,
  Form,
  FormProps,
  TextInput,
  TextInputProps,
} from "carbon-components-react";
import { useRouter } from "next/router";

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
  const router = useRouter();
  return (
    <>
      <Form {...formProps}>
        <TextInput type="text" {...usernameInput} />

        <TextInput type="password" {...passwordInput} />

        <Button type="submit">{submitButtonText}</Button>
      </Form>
      <Button
        hasIconOnly
        tooltip={backButtonText}
        renderIcon={SkipBack20}
        kind="ghost"
        onClick={() => router.back()}>
        {backButtonText}
      </Button>
    </>
  );
};
