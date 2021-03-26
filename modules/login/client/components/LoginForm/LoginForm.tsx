import { IAppPage } from "@/modules/common/types";
import { hasElement, tryGet } from "@/modules/common/utils";
import { useLoginForm } from "@/modules/login/hooks";
import { ILoginView } from "@/modules/login/types";
import { Button, Column, FormLabel, Row } from "carbon-components-react";
import { LoginFormLayout } from "./LoginFormLayout";
import { ArrowLeft16 } from "@carbon/icons-react";
import { useRouter } from "next/router";

export type LoginFormProps = Pick<IAppPage, "elements" | "lang">;

export const LoginForm = (definition: ILoginView) => {
  const router = useRouter();

  const loginFormProps = useLoginForm(definition);
  return (
    <>
      <Row>
        <Column>
          <LoginFormLayout {...loginFormProps}></LoginFormLayout>
        </Column>
      </Row>
      <Row>
        {definition.links.map(link => (
          <Column>
            <FormLabel className="hedi--block-label">
              {tryGet(link.key, definition.elements)?.help}
            </FormLabel>
            {hasElement(link.key, definition.elements) && (
              <Button href={link.route}>{link.label}</Button>
            )}
          </Column>
        ))}
      </Row>
      <Row>
        <Column>
          <Button
            tooltip={loginFormProps.backButtonText}
            renderIcon={ArrowLeft16}
            kind="ghost"
            onClick={() => router.back()}>
            {loginFormProps.backButtonText}
          </Button>
        </Column>
      </Row>
    </>
  );
};
