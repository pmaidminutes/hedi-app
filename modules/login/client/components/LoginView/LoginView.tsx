import { SimplePageView } from "@/modules/simplePage/client/components";
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
  return (
    <SimplePageView
      content={content}
      url="/images/Pregnancy_blue.svg"
      alt="Beschreibung des Bildes"
      customKey="login-form"
      rightColumnProps={{ md: 4, lg: 6, xlg: 6 }}>
      <LoginForm {...content} />
    </SimplePageView>
  );
};
