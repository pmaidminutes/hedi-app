// React
import { useState } from "react";
// Next
import { useRouter } from "next/router";
// hooks
import {
  transformProfile,
  getProfileViewData,
} from "@/modules/profile/client/components/Profile";
// types
import { ColumnDefaultProps } from "carbon-components-react";
import { IUserFeedbackView } from "@/modules/userFeedback/types";
import { ProfileView } from "@/modules/profile/query";
import { IAppPage } from "@/modules/common/types";

import { headlineType } from "@/modules/profile/client/components/Services/transformServices";
export interface IUserFeedbackFormProps {
  content: IUserFeedbackView;
  locale: string;
  profile: ProfileView;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  centerProps?: ColumnDefaultProps;
}
// Constants
const REDIRECT_DELAY = 1500; // ms wait before redirect (in sucess cases)
// utils
import { tryGet } from "@/modules/common/utils";

export function useUserFeedbackForm(props: IUserFeedbackFormProps) {
  const {
    content,
    locale,
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

  const { subPages, elements } = content;
  const {
    servicesHeadline,
    languagesHeadline,
    contactHeadline,
    relatedHeadline,
    officeHrsHeadline,
  } = getProfileViewData(profileElements, lang);

  // TODO improve
  const serviceHeadlineType: headlineType = "h3";
  const servicesDataWithHeadlineType = {
    ...servicesData,
    headlineType: serviceHeadlineType,
  };

  const onSuccess = () => {
    const thanksPageRoute = getSubPage("userfeedbackThanks", content.subPages)
      .route;
    setErrorMessage(null);
    setSuccessMessage(
      tryGet("success_message", content.elements)?.description || null
    );
    setTimeout(() => router.push(thanksPageRoute), REDIRECT_DELAY);
  };
  const onError = () => {
    setSuccessMessage(null);
    setErrorMessage(
      tryGet("error_message", content.elements)?.description || null
    );
  };
  const onEmptyError = () => {
    setSuccessMessage(null);
    setErrorMessage(
      tryGet("empty_error_message", content.elements)?.description || null
    );
  };

  const left = leftColumnProps ?? { sm: 4, lg: { span: 8 } };
  const right = rightColumnProps ?? { sm: 4, lg: { span: 8 } };
  const center = centerProps ?? { lg: { span: 8, offset: 4 } };

  return {
    locale,
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
