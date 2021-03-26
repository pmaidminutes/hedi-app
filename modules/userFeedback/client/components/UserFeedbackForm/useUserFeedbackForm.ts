// React
import { useState } from "react";
// Next
import { useRouter } from "next/router";
// hooks
import { useProfile } from "@/modules/profile/client/components/Profile/useProfile";
// types
import { ColumnDefaultProps } from "carbon-components-react";
import { IUserFeedbackView } from "@/modules/userFeedback/types";
import { ProfileView } from "@/modules/profile/query";
import { IAppPage } from "@/modules/common/types";

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
    mapData,
  } = useProfile({ content: profile });

  const { subPages, elements } = content;

  const onSuccess = () => {
    const thanksPageRoute = getSubPage("userfeedbackThanks", content.subPages)
      .route;
    setSuccessMessage(
      tryGet("success_message", content.elements)?.description || null
    );
    setTimeout(() => router.push(thanksPageRoute), REDIRECT_DELAY);
  };
  const onError = () =>
    setErrorMessage(
      tryGet("error_message", content.elements)?.description || null
    );

  const left = leftColumnProps ?? { sm: 12, lg: 6, xlg: 7 };
  const right = rightColumnProps ?? { sm: 12, lg: 6, xlg: 7 };
  const center = centerProps ?? { lg: { span: 10, offset: 3 } };

  return {
    locale,
    onSuccess,
    onError,
    left,
    right,
    center,
    profileEntryData,
    servicesData,
    contactData,
    languagesData,
    errorMessage,
    successMessage,
    subPages,
    elements,
    getSubPage,
  };
}