import { useFeedbackForm } from "./useFeedbackForm";
import {
  MultipleFeedback,
  FeedbackSendbox,
} from "@/modules/feedback/client/components";
import { FeedbackAppPageEntry } from "@/modules/feedback/client/components/FeedbackEntry/FeedbackAppPageEntry";
import { Column, Row } from "carbon-components-react";
import { BgImgContainer, Seperator } from "@/modules/common/components";
import { ProfileEntry } from "@/modules/profile/client/components/ProfileEntry";

import { ServiceGroup } from "@/modules/profile/client/components/ServiceGroup";
import { LanguageSkills } from "@/modules/profile/client/components/LanguageSkills";
import { Contact } from "@/modules/profile/client/components/Contact";
import { IFeedbackFormProps } from "./IFeedbackFormProps";

export default function FeedbackForm(props: IFeedbackFormProps) {
  const {
    locale,
    onSuccess,
    onError,
    onEmptyError,
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
    servicesHeadline,
    languagesHeadline,
    contactHeadline,
    relatedHeadline,
    officeHrsHeadline,
    getSubPage,
  } = useFeedbackForm(props);

  return (
    <MultipleFeedback
      lang={locale}
      onSuccess={onSuccess}
      onError={onError}
      onEmptyError={onEmptyError}>
      <Row>
        <Column {...left}>
          <BgImgContainer>
            <ProfileEntry {...profileEntryData} />
          </BgImgContainer>
        </Column>
        <Column {...right}>
          <FeedbackAppPageEntry
            {...getSubPage("userfeedback_profile", subPages)}
          />
        </Column>
      </Row>
      <Row>
        <Column lg={{ span: 16 }}>
          <Seperator />
        </Column>
      </Row>
      <Row>
        <Column {...left}>
          <ServiceGroup headline={servicesHeadline} {...servicesData} />
        </Column>
        <Column {...right}>
          <FeedbackAppPageEntry
            {...getSubPage("userfeedback_activities", subPages)}
          />
        </Column>
      </Row>
      <Row>
        <Column lg={{ span: 16 }}>
          <Seperator />
        </Column>
      </Row>
      <Row>
        <Column {...left}>
          <Contact
            headline={contactHeadline}
            officeHrsHeadline={officeHrsHeadline}
            {...contactData}
          />
        </Column>
        <Column {...right}>
          <FeedbackAppPageEntry
            {...getSubPage("userfeedback_contact_freetimes", subPages)}
          />
        </Column>
      </Row>
      <Row>
        <Column lg={{ span: 16 }}>
          <Seperator />
        </Column>
      </Row>
      <Row>
        <Column {...left}>
          <LanguageSkills headline={languagesHeadline} {...languagesData} />
        </Column>
        <Column {...right}>
          <FeedbackAppPageEntry
            {...getSubPage("userfeedback_languages", subPages)}
          />
        </Column>
      </Row>
      <Row>
        <Column lg={{ span: 16 }}>
          <Seperator />
        </Column>
      </Row>
      <Row>
        <Column {...center}>
          <FeedbackAppPageEntry
            {...getSubPage("userfeedback_usage", subPages)}
          />
        </Column>
      </Row>
      <Row>
        <Column lg={{ span: 16 }}>
          <Seperator />
        </Column>
      </Row>
      <Row>
        <Column {...center}>
          <FeedbackAppPageEntry
            {...getSubPage("userfeedback_summary", subPages)}
          />
        </Column>
      </Row>
      <Row>
        <Column {...center}>
          <FeedbackSendbox
            elements={elements}
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        </Column>
      </Row>
    </MultipleFeedback>
  );
}
