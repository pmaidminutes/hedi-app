import { useFeedbackForm } from "./useFeedbackForm";
import {
  MultipleFeedback,
  FeedbackSendbox,
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
            body={findBodyInstance(components, "feedback_profile_description")}
            label={findLabelInstance(components, "feedback_profile_label")}
            input={findTextAreaInstance(components, "feedback_profile_body")}
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
            body={findBodyInstance(
              components,
              "feedback_activities_description"
            )}
            label={findLabelInstance(components, "feedback_activities_label")}
            input={findTextAreaInstance(components, "feedback_activities_body")}
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
            body={findBodyInstance(
              components,
              "feedback_consultation_description"
            )}
            label={findLabelInstance(components, "feedback_consultation_label")}
            input={findTextAreaInstance(
              components,
              "feedback_consultation_body"
            )}
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
            body={findBodyInstance(
              components,
              "feedback_languages_description"
            )}
            label={findLabelInstance(components, "feedback_languages_label")}
            input={findTextAreaInstance(components, "feedback_languages_body")}
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
            body={findBodyInstance(components, "feedback_usage_description")}
            label={findLabelInstance(components, "feedback_usage_label")}
            input={findTextAreaInstance(components, "feedback_usage_body")}
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
            body={findBodyInstance(components, "feedback_summary_description")}
            label={findLabelInstance(components, "feedback_summary_label")}
            input={findTextAreaInstance(components, "feedback_summary_body")}
          />
        </Column>
      </Row>
      <Row>
        <Column {...center}>
          <FeedbackSendbox
            components={components}
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        </Column>
      </Row>
    </MultipleFeedback>
  );
}
