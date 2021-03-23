import {
  Button,
  Column,
  Form,
  FormProps,
  Grid,
  Row,
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
    <Grid>
      <Column>
        <Row></Row>
      </Column>
      <Column>
        <Row>
          <Form {...formProps}>
            <TextInput type="text" {...usernameInput} />
            <TextInput type="password" {...passwordInput} />
            <Button type="submit">{submitButtonText}</Button>
          </Form>
        </Row>
        <Row>
          <button type="button" onClick={() => router.back()}>
            {backButtonText}
          </button>
        </Row>
      </Column>
    </Grid>
  );
};
