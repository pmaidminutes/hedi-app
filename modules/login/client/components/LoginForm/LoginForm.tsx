import { IAppPage } from "@/modules/common/types";
import { tryGet } from "@/modules/common/utils";
import { useLoginForm } from "@/modules/login/hooks";
import { ILoginView } from "@/modules/login/types";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { Button, FormLabel } from "carbon-components-react";
import { LoginFormLayout } from "./LoginFormLayout";

export type LoginFormProps = Pick<IAppPage, "elements" | "lang">;

export const LoginForm = (definition: ILoginView) => (
  <SimplePageView
    url="/Pregnancy_pink80.svg"
    alt="Beschreibung des Bildes"
    content={definition}>
    <LoginFormLayout {...useLoginForm(definition)}></LoginFormLayout>
    {definition.links.map(link => (
      <div>
        <FormLabel>{tryGet(link.key, definition.elements)?.help}</FormLabel>
        {tryGet(link.key, definition.elements) ? (
          <Button href={link.route}>{link.label}</Button>
        ) : (
          ""
        )}
      </div>
    ))}
  </SimplePageView>
);
