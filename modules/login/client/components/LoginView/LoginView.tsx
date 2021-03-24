import { IAppPage } from "@/modules/common/types";
import { tryGetRedirect } from "@/modules/common/utils";
import { useLoginView } from "@/modules/login/hooks";
import { ILoginView } from "@/modules/login/types";
import { LoginForm } from "../LoginForm";

export const LoginView = ({ content }: { content: ILoginView }) => {
  // TODO redirect to a better location
  useLoginView(
    tryGetRedirect(
      "redirect",
      content.elements,
      content.links,
      "/" + content.lang
    )
  );
  return <LoginForm {...content} />;
};
