import {
  MultipleUserFeedback,
  UserFeedbackSendbox,
} from "@/modules/userFeedback/client/components";
import { IUserFeedbackView } from "@/modules/userFeedback/types";
import { UserFeedbackAppPageEntry } from "@/modules/userFeedback/client/components/UserFeedbackEntry/UserFeedbackAppPageEntry";
import { Column, Row, Grid } from "carbon-components-react";
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
  className: string;
  profile: ProfileView;
}

const REDIRECT_DELAY = 1500; // ms wait before redirect (in sucess cases)

export default function UserFeedbackForm({
  content,
  locale,
  className,
  profile,
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

  return (
    <div className="hedi--multiple-user-feedback">
      <MultipleUserFeedback
        lang={locale}
        onSuccess={onSuccess}
        onError={onError}>
        <Grid>
          <h1>{content.longTitle ?? content.label}</h1>
          <Row>
            <Column sm={4} md={4} lg={8}>
              <BgImgContainer>
                <ProfileEntry {...profileEntryData} />
              </BgImgContainer>
            </Column>
            <Column sm={4} md={4} lg={8}>
              <UserFeedbackAppPageEntry
                {...getSubPage("userfeedback_profile", content.subPages)}
              />
            </Column>
          </Row>
          <Seperator />
          <Row>
            <Column lg={6} sm={12}>
              <Services {...servicesData} />
            </Column>
            <Column lg={6} sm={12}>
              <UserFeedbackAppPageEntry
                {...getSubPage("userfeedback_activities", content.subPages)}
              />
            </Column>
          </Row>
          <Seperator />
          <Row>
            <Column lg={6} sm={12}>
              <Contact {...contactData} />
            </Column>
            <Column lg={6} sm={12}>
              <UserFeedbackAppPageEntry
                {...getSubPage(
                  "userfeedback_contact_freetimes",
                  content.subPages
                )}
              />
            </Column>
          </Row>
          <Seperator />
          <Row>
            <Column lg={6} sm={12}>
              <LanguageSkills {...languagesData} />
            </Column>
            <Column lg={6} sm={12}>
              <UserFeedbackAppPageEntry
                {...getSubPage("userfeedback_languages", content.subPages)}
              />
            </Column>
          </Row>
          <Seperator />
          <Row>
            <Column sm={4} md={6} lg={6}>
              <UserFeedbackAppPageEntry
                {...getSubPage("userfeedback_usage", content.subPages)}
              />
            </Column>
          </Row>
          <Seperator />
          <Row>
            <Column sm={4} md={6} lg={6}>
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
        </Grid>
      </MultipleUserFeedback>
    </div>
  );
}
