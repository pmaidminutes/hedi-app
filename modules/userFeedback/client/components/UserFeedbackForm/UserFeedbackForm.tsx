import {
  MultipleUserFeedback,
  UserFeedbackSendbox,
} from "@/modules/userFeedback/client/components";
import { IUserFeedbackView } from "@/modules/userFeedback/types";
import { UserFeedbackAppPageEntry } from "@/modules/userFeedback/client/components/UserFeedbackEntry/UserFeedbackAppPageEntry";
import { Column, ColumnDefaultProps, Row } from "carbon-components-react";
import { IAppPage } from "@/modules/common/types";
import { BgImgContainer, Seperator } from "@/modules/common/components";
import { ProfileEntry } from "@/modules/profile/client/components/ProfileEntry";
import { useProfile } from "@/modules/profile/client/components/Profile/useProfile";
import { ProfileView } from "@/modules/profile/query";
import { Services } from "@/modules/profile/client/components/Services";
import { LanguageSkills } from "@/modules/profile/client/components/LanguageSkills";
import { Contact } from "@/modules/profile/client/components/Contact";
import { useRouter } from "next/router";
import { useState } from "react";
import { tryGet } from "@/modules/common/utils";

interface IUserFeedbackFormProps {
  content: IUserFeedbackView;
  locale: string;
  profile: ProfileView;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  centerProps?: ColumnDefaultProps;
}

const REDIRECT_DELAY = 1500; // ms wait before redirect (in sucess cases)

export default function UserFeedbackForm({
  content,
  locale,
  profile,
  leftColumnProps,
  rightColumnProps,
  centerProps,
}: IUserFeedbackFormProps) {
  const router = useRouter();
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    "error message"
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(
    "success msg"
  );

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
  return (
    <MultipleUserFeedback lang={locale} onSuccess={onSuccess} onError={onError}>
      <Row>
        <Column {...left}>
          <BgImgContainer>
            <ProfileEntry {...profileEntryData} />
          </BgImgContainer>
        </Column>
        <Column {...right}>
          <UserFeedbackAppPageEntry
            {...getSubPage("userfeedback_profile", content.subPages)}
          />
        </Column>
      </Row>
      <Seperator />
      <Row>
        <Column {...left}>
          <Services {...servicesData} />
        </Column>
        <Column {...right}>
          <UserFeedbackAppPageEntry
            {...getSubPage("userfeedback_activities", content.subPages)}
          />
        </Column>
      </Row>
      <Seperator />
      <Row>
        <Column {...left}>
          <Contact {...contactData} />
        </Column>
        <Column {...right}>
          <UserFeedbackAppPageEntry
            {...getSubPage("userfeedback_contact_freetimes", content.subPages)}
          />
        </Column>
      </Row>
      <Seperator />
      <Row>
        <Column {...left}>
          <LanguageSkills {...languagesData} />
        </Column>
        <Column {...right}>
          <UserFeedbackAppPageEntry
            {...getSubPage("userfeedback_languages", content.subPages)}
          />
        </Column>
      </Row>
      <Seperator />
      <Row>
        <Column {...center}>
          <UserFeedbackAppPageEntry
            {...getSubPage("userfeedback_usage", content.subPages)}
          />
        </Column>
      </Row>
      <Seperator />
      <Row>
        <Column {...center}>
          <UserFeedbackAppPageEntry
            {...getSubPage("userfeedback_summary", content.subPages)}
          />
        </Column>
      </Row>
      <UserFeedbackSendbox
        elements={content.elements}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </MultipleUserFeedback>
  );
}
