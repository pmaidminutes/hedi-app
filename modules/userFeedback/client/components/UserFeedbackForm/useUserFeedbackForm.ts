// React
import { useState } from "react";
// Next
import { useRouter } from "next/router";
// hooks
import {
  transformProfile,
  getProfileViewData,
} from "@/modules/profile/client/components/Profile";
import { getUIElementRedirectRoute } from "@/modules/common/utils";

import { IAppPage } from "@/modules/common/types";

// Constants
const REDIRECT_DELAY = 1500; // ms wait before redirect (in sucess cases)
// utils
import { getUIElement } from "@/modules/common/utils";
// types
import { IUserFeedbackFormProps } from "./IUserFeedbackFormProps";
import { headlineType } from "@/modules/profile/client/components/Services/transformServices";

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

  const {
    languagesData,
    profileEntryData,
    servicesData,
    contactData,
    relatedProfilesData,
    lang,
    elements: profileElements,
    // mapData, HACK currently incompatible
  } = transformProfile({ content: profile });

  const { subPages, elements, links } = content;
  const {
    servicesHeadline,
    languagesHeadline,
    contactHeadline,
    relatedHeadline,
    officeHrsHeadline,
  } = getProfileViewData(profileElements, links, lang);

  // TODO improve
  const serviceHeadlineType: headlineType = "h3";
  const servicesDataWithHeadlineType = {
    ...servicesData,
    headlineType: serviceHeadlineType,
  };

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
    profileEntryData,
    servicesData: servicesDataWithHeadlineType,
    contactData,
    languagesData,
    errorMessage,
    successMessage,
    subPages,
    elements,
    servicesHeadline,
    languagesHeadline,
    contactHeadline,
    relatedHeadline,
    officeHrsHeadline,
    getSubPage,
  };
}
