import { ILoginView } from "@/modules/login/types";
import { useLoginForm } from "./useLoginForm";
import { tryGet } from "@/modules/common/utils";

import {
  Button,
  Form,
  InlineLoading,
  TextInput,
  ToastNotification,
  Link,
} from "carbon-components-react";

export type LoginFormProps = Pick<ILoginView, "elements" | "lang" | "links"> & {
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
    links,
    elements,
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
      <div>
        <Button type="submit">
          {loginLoading ? <InlineLoading status="active" /> : submitButtonText}
        </Button>
        {links.map(link => {
          if (link.key === "registration") {
            return (
              <span>
                {tryGet(link.key, elements)?.help}
                <Link href={link.route}>
                  {tryGet(link.key, elements)?.placeholder}
                </Link>
              </span>
            );
          }
        })}
      </div>
    </Form>
  );
};
