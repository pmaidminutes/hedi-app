import { IAppPage } from "@/modules/common/types";
import { tryGet } from "@/modules/common/utils";
import { useLoginForm } from "@/modules/login/hooks";
import { ILoginView } from "@/modules/login/types";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { Button, FormLabel, Column } from "carbon-components-react";
import { LoginFormLayout } from "./LoginFormLayout";
import { ArrowLeft16 } from "@carbon/icons-react";
import { useRouter } from "next/router";

export type LoginFormProps = Pick<IAppPage, "elements" | "lang">;

export const LoginForm = (definition: ILoginView) => {
  const router = useRouter();

  const { backButtonText } = useLoginForm(definition);
  return (
    <SimplePageView
      url="/Pregnancy_pink80.svg"
      alt="Beschreibung des Bildes"
      customKey="login-form"
      content={definition}>
      <Column lg={8} md={6}>
        <LoginFormLayout {...useLoginForm(definition)}></LoginFormLayout>
        {definition.links.map(link => (
          <div>
            <FormLabel className="hedi--block-label">
              {tryGet(link.key, definition.elements)?.help}
            </FormLabel>
            {tryGet(link.key, definition.elements) ? (
              <Button href={link.route}>{link.label}</Button>
            ) : (
              ""
            )}
          </div>
        ))}
        <Button
          tooltip={backButtonText}
          renderIcon={ArrowLeft16}
          kind="ghost"
          onClick={() => router.back()}>
          {backButtonText}
        </Button>
      </Column>
    </SimplePageView>
  );
};
