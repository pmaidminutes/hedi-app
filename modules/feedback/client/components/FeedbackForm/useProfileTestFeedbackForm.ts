// React
import { useState } from "react";
// Next
import { useRouter } from "next/router";

// Constants
const REDIRECT_DELAY = 1500; // ms wait before redirect (in sucess cases)
// types
import { IProfileTestFeedbackFormProps } from "./IProfileTestFeedbackFormProps";
import {
  findLinkInstance,
  findToastNotificationInstance,
} from "@/modules/components/types";

export function useProfileTestFeedbackForm(
  props: IProfileTestFeedbackFormProps
) {
  const { content, leftColumnProps, rightColumnProps, centerProps } = props;
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { components } = content;

  const onSuccess = () => {
    const thanksPageRoute =
      findLinkInstance(components, "success_redirect")?.href || "/";
    setErrorMessage(null);
    setSuccessMessage(
      findToastNotificationInstance(components, "success_message")?.subtitle ||
        null
    );
    setTimeout(() => router.push(thanksPageRoute), REDIRECT_DELAY);
  };
  const onError = () => {
    setSuccessMessage(null);
    setErrorMessage(
      findToastNotificationInstance(components, "error_message")?.subtitle ||
        null
    );
  };
  const onEmptyError = () => {
    setSuccessMessage(null);
    setErrorMessage(
      findToastNotificationInstance(components, "empty_error_message")
        ?.subtitle || null
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
    components,
  };
}
