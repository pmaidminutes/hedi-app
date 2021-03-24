import { IAppPage } from "@/modules/common/types";
import { useLoginForm } from "@/modules/login/hooks";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { LoginFormLayout } from "./LoginFormLayout";

export type LoginFormProps = Pick<IAppPage, "elements" | "lang">;

export const LoginForm = (definition: IAppPage) => (
  <>
    <SimplePageView content={definition}></SimplePageView>
    <LoginFormLayout {...useLoginForm(definition)}></LoginFormLayout>
  </>
);
