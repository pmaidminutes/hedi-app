// React
import { useState } from "react";
// Next
import { useRouter } from "next/router";
import { getUIElementRedirectRoute } from "@/modules/common/utils";

// Constants
const REDIRECT_DELAY = 1500; // ms wait before redirect (in sucess cases)
// utils
import { getUIElement } from "@/modules/common/utils";
// types
import { IUserFeedbackFormProps } from "./IUserFeedbackFormProps";
import { IAppPage } from "@/modules/common/types";
import { headlineType } from "@/modules/profile/client/components/ServiceGroup/IServiceGroupProps";

export function useUserFeedbackForm(props: IUserFeedbackFormProps) {
  const {
    content,
    profile,
    leftColumnProps,
    rightColumnProps,
    centerProps,
  } = props;
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getSubPage = (key: string, subPages: IAppPage[]) =>
    subPages?.find(page => page.key == key) || ({} as IAppPage);

  const { subPages, elements, links } = content;

  const onSuccess = () => {
    const thanksPageRoute = getUIElementRedirectRoute(
      "success_redirect",
      elements,
      links
    );
    setErrorMessage(null);
    setSuccessMessage(
      getUIElement("success_message", content.elements)?.description || null
    );
    setTimeout(() => router.push(thanksPageRoute), REDIRECT_DELAY);
  };
  const onError = () => {
    setSuccessMessage(null);
    setErrorMessage(
      getUIElement("error_message", content.elements)?.description || null
    );
  };
  const onEmptyError = () => {
    setSuccessMessage(null);
    setErrorMessage(
      getUIElement("empty_error_message", content.elements)?.description || null
    );
  };

  const left = leftColumnProps ?? { sm: 4, lg: { span: 8 } };
  const right = rightColumnProps ?? { sm: 4, lg: { span: 8 } };
  const center = centerProps ?? { lg: { span: 8, offset: 4 } };

  return {
    locale: content.lang,
    onSuccess,
    onError,
    onEmptyError,
    left,
    right,
    center,
    errorMessage,
    successMessage,
    subPages,
    elements,
    getSubPage,
  };
}
