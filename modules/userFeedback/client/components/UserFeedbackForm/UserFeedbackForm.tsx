import {
  IUserFeedbackFormProps,
  useUserFeedbackForm,
} from "./useUserFeedbackForm";
import {
  MultipleUserFeedback,
  UserFeedbackSendbox,
} from "@/modules/userFeedback/client/components";
import { UserFeedbackAppPageEntry } from "@/modules/userFeedback/client/components/UserFeedbackEntry/UserFeedbackAppPageEntry";
import { Column, Row } from "carbon-components-react";
import { BgImgContainer, Seperator } from "@/modules/common/components";
import { ProfileEntry } from "@/modules/profile/client/components/ProfileEntry";

import { Services } from "@/modules/profile/client/components/Services";
import { LanguageSkills } from "@/modules/profile/client/components/LanguageSkills";
import { Contact } from "@/modules/profile/client/components/Contact";

export default function UserFeedbackForm(props: IUserFeedbackFormProps) {
  const {
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
  } = useUserFeedbackForm(props);

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
            {...getSubPage("userfeedback_profile", subPages)}
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
            {...getSubPage("userfeedback_activities", subPages)}
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
            {...getSubPage("userfeedback_contact_freetimes", subPages)}
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
            {...getSubPage("userfeedback_languages", subPages)}
          />
        </Column>
      </Row>
      <Seperator />
      <Row>
        <Column {...center}>
          <UserFeedbackAppPageEntry
            {...getSubPage("userfeedback_usage", subPages)}
          />
        </Column>
      </Row>
      <Seperator />
      <Row>
        <Column {...center}>
          <UserFeedbackAppPageEntry
            {...getSubPage("userfeedback_summary", subPages)}
          />
        </Column>
      </Row>
      <UserFeedbackSendbox
        elements={elements}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </MultipleUserFeedback>
  );
}
