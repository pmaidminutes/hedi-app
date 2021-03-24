import { IAppPage } from "@/modules/common/types";
import { tryGet } from "@/modules/common/utils";
import { useLoginForm } from "@/modules/login/hooks";
import { ILoginView } from "@/modules/login/types";
import { SimplePageView } from "@/modules/simplePage/client/components";
import {
  Button,
  ButtonSet,
  Column,
  FormLabel,
  Row,
} from "carbon-components-react";
import { LoginFormLayout } from "./LoginFormLayout";

export type LoginFormProps = Pick<IAppPage, "elements" | "lang">;

export const LoginForm = (definition: ILoginView) => (
  <>
    <SimplePageView content={definition}></SimplePageView>
    <LoginFormLayout {...useLoginForm(definition)}></LoginFormLayout>
    <Row>
      {definition.links.map(link => (
        <Column>
          <ButtonSet stacked>
            <FormLabel>{tryGet(link.key, definition.elements)?.help}</FormLabel>
            {tryGet(link.key, definition.elements) ? (
              <Button href={link.route}>{link.label}</Button>
            ) : (
              ""
            )}
          </ButtonSet>
        </Column>
      ))}
    </Row>
  </>
);
