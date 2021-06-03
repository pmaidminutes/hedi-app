import { useFeedbackForm } from "./useFeedbackForm";
import {
  MultipleFeedback,
  FeedbackSubmit,
} from "@/modules/feedback/client/components";
import { FeedbackInput } from "@/modules/feedback/client/components/FeedbackInput/FeedbackInput";
import { Column, Row } from "carbon-components-react";
import { BgImgContainer, Seperator } from "@/modules/common/components";
import { ProfileEntry } from "@/modules/profile/client/components/ProfileEntry";

import { ServiceGroup } from "@/modules/profile/client/components/ServiceGroup";
import { LanguageSkills } from "@/modules/profile/client/components/LanguageSkills";
import { Contact } from "@/modules/profile/client/components/Contact";
import { IFeedbackFormProps } from "./IFeedbackFormProps";
import {
  findBodyInstance,
  findLabelInstance,
  findTextAreaInstance,
} from "@/modules/model/components";

export default function FeedbackForm(props: IFeedbackFormProps) {
  const {
    locale,
    onSuccess,
    onError,
    onEmptyError,
    left,
    right,
    center,
    // profileEntryData,
    // servicesData,
    // contactData,
    // languagesData,
    errorMessage,
    successMessage,
    // servicesHeadline,
    // languagesHeadline,
    // contactHeadline,
    // relatedHeadline,
    // officeHrsHeadline,
    components,
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
            {/* <ProfileEntry {...profileEntryData} /> */}
          </BgImgContainer>
        </Column>
        <Column {...right}>
          <FeedbackInput
            body={findBodyInstance(components, "profile_description")}
            input={findTextAreaInstance(components, "profile_input")}
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
          {/* <ServiceGroup headline={servicesHeadline} {...servicesData} /> */}
        </Column>
        <Column {...right}>
          <FeedbackInput
            body={findBodyInstance(components, "activities_description")}
            input={findTextAreaInstance(components, "activities_input")}
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
          {/* <Contact
            headline={contactHeadline}
            officeHrsHeadline={officeHrsHeadline}
            {...contactData}
          /> */}
        </Column>
        <Column {...right}>
          <FeedbackInput
            body={findBodyInstance(components, "consultation_description")}
            input={findTextAreaInstance(components, "consultation_input")}
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
          {/* <LanguageSkills headline={languagesHeadline} {...languagesData} /> */}
        </Column>
        <Column {...right}>
          <FeedbackInput
            body={findBodyInstance(components, "languages_description")}
            input={findTextAreaInstance(components, "languages_input")}
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
          <FeedbackInput
            body={findBodyInstance(components, "usage_description")}
            input={findTextAreaInstance(components, "usage_input")}
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
          <FeedbackInput
            body={findBodyInstance(components, "summary_description")}
            input={findTextAreaInstance(components, "summary_input")}
          />
        </Column>
      </Row>
      <Row>
        <Column {...center}>
          <FeedbackSubmit
            components={components}
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        </Column>
      </Row>
    </MultipleFeedback>
  );
}
