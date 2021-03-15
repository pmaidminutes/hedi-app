import { IAppPage } from "@/modules/common/types";
import { useLoginForm } from "./loginFormHook";
import { LoginFormLayout } from "./LoginFormLayout";

export type LoginFormProps = Pick<IAppPage, "elements" | "lang">;

export const LoginForm = ({ definition }: { definition: LoginFormProps }) => (
  <LoginFormLayout {...useLoginForm(definition)}></LoginFormLayout>
);
