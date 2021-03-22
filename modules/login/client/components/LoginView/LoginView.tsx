import { IAppPage } from "@/modules/common/types";
import { LoginForm } from "../LoginForm";
import { useLoginView } from "./loginViewHook";

export const LoginView = ({ content }: { content: IAppPage }) => {
  // TODO redirect to a better location
  useLoginView("/" + content.lang);

  return <LoginForm {...content} />;
};
