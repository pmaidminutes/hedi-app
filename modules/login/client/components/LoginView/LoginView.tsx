import { IAppPage } from "@/modules/common/types";
import { useLoginView } from "@/modules/login/hooks";
import { LoginForm } from "../LoginForm";

export const LoginView = ({ content }: { content: IAppPage }) => {
  // TODO redirect to a better location
  useLoginView("/" + content.lang);
  return <LoginForm {...content} />;
};
