import { IAppPage } from "@/modules/common/types";
import { useLoginView } from "@/modules/login/hooks";
import { ILoginView } from "@/modules/login/types";
import { LoginForm } from "../LoginForm";

export const LoginView = ({ content }: { content: ILoginView }) => {
  // TODO redirect to a better location
  useLoginView("/" + content.lang);
  return <LoginForm {...content} />;
};
