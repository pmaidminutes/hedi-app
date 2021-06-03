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

// Constants
const REDIRECT_DELAY = 1500; // ms wait before redirect (in sucess cases)
// types
import { IProfileTestFeedbackFormProps } from "./IProfileTestFeedbackFormProps";
import { headlineType } from "@/modules/profile/client/components/ServiceGroup/IServiceGroupProps";
import {
  findLinkInstance,
  findToastNotificationInstance,
} from "@/modules/model/components";

export function useProfileTestFeedbackForm(
  props: IProfileTestFeedbackFormProps
) {
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

  const { components } = content;
  // const {
  //   servicesHeadline,
  //   languagesHeadline,
  //   contactHeadline,
  //   relatedHeadline,
  //   officeHrsHeadline,
  // } = getProfileViewData(profileElements, links, lang);

  // TODO improve
  const serviceHeadlineType: headlineType = "h3";
  const servicesDataWithHeadlineType = {
    ...servicesData,
    headlineType: serviceHeadlineType,
  };

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
    profileEntryData,
    servicesData: servicesDataWithHeadlineType,
    contactData,
    languagesData,
    errorMessage,
    successMessage,
    components,
    // servicesHeadline,
    // languagesHeadline,
    // contactHeadline,
    // relatedHeadline,
    // officeHrsHeadline,
  };
}
