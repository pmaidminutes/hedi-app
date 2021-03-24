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
      <Row>
        <Form {...formProps}>
          <Row>
            <TextInput type="text" {...usernameInput} />
          </Row>
          <Row>
            <TextInput type="password" {...passwordInput} />
          </Row>
          <Row>
            <Column>
              <Button type="submit">{submitButtonText}</Button>
            </Column>
          </Row>
          <Row>
            <Column>
              <button type="button" onClick={() => router.back()}>
                {backButtonText}
              </button>
            </Column>
          </Row>
        </Form>
      </Row>
    </Grid>
  );
};
