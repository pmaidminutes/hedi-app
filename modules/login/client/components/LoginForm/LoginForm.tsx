import { ILoginView } from "@/modules/login/types";
import { useLoginForm } from "./useLoginForm";
import { tryGet } from "@/modules/common/utils";

import {
  Button,
  Form,
  InlineLoading,
  TextInput,
  InlineNotification,
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
    successNotification,
    links,
    elements,
  } = useLoginForm(props);

  return (
    <Form onSubmit={handleSubmit}>
      <TextInput type="text" {...usernameInput} />

      <TextInput type="password" {...passwordInput} />

      {loginNotification && (
        <InlineNotification
          kind="error"
          lowContrast={true}
          hideCloseButton={true}
          style={{ width: "100%" }}
          {...loginNotification}
        />
      )}

      {successNotification && (
        <InlineNotification
          kind="success"
          lowContrast={true}
          hideCloseButton={true}
          caption={<InlineLoading status="active" />}
          style={{ width: "100%" }}
          {...successNotification}
        />
      )}
      <div className="hedi--login-buttoncontainer">
        {!successNotification && (
          <Button type="submit">
            {loginLoading ? (
              <InlineLoading status="active" />
            ) : (
              submitButtonText
            )}
          </Button>
        )}
        {links.map((link, index) => {
          if (link.key === "registration") {
            return (
              <span key={link.key + index}>
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
