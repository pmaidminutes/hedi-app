import { SimpleAppPageView } from "@/modules/common/components/AppPage";
import { IAppPage } from "@/modules/common/types";
import { useLoginForm } from "./loginFormHook";
import { LoginFormLayout } from "./LoginFormLayout";

export type LoginFormProps = Pick<IAppPage, "elements" | "lang">;

export const LoginForm = (definition: IAppPage) => (
  <>
    <SimpleAppPageView
      content={definition}
      rootCssClass="login-form"></SimpleAppPageView>
    <LoginFormLayout {...useLoginForm(definition)}></LoginFormLayout>
  </>
);
