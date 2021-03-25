import {
  MultipleUserFeedback,
  UserFeedbackSendbox,
} from "@/modules/userFeedback/client/components";
import { IUserFeedbackView } from "@/modules/userFeedback/types";
import { UserFeedbackAppPageEntry } from "@/modules/userFeedback/client/components/UserFeedbackEntry/UserFeedbackAppPageEntry";
import { Column, Row } from "carbon-components-react";
import { IAppPage } from "@/modules/common/types";
import { BgImgContainer, Seperator } from "@/modules/common/components";
import { ProfileEntry } from "@/modules/profile/client/components/ProfileEntry";
import { useProfile } from "@/modules/profile/client/components/Profile/useProfile";
import { ProfileView } from "@/modules/profile/query";
import { Services } from "@/modules/profile/client/components/Services";
import { LanguageSkills } from "@/modules/profile/client/components/LanguageSkills";
import { Contact } from "@/modules/profile/client/components/Contact";
import { useRouter } from "next/router";

interface IUserFeedbackFormProps {
  content: IUserFeedbackView;
  locale: string;
  className: string;
  profile: ProfileView;
}

export default function UserFeedbackForm({
  content,
  locale,
  className,
  profile,
}: IUserFeedbackFormProps) {
  const router = useRouter();
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
    router.push(thanksPageRoute);
  };

  return (
    <div className={className}>
      <MultipleUserFeedback lang={locale} onSuccess={onSuccess}>
        <h1>{content.longTitle ?? content.label}</h1>
        <Row>
          <Column lg={6} sm={12}>
            <BgImgContainer>
              <ProfileEntry {...profileEntryData} />
            </BgImgContainer>
          </Column>
          <Column lg={6} sm={12}>
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
          <Column lg={12}>
            <UserFeedbackAppPageEntry
              {...getSubPage("userfeedback_usage", content.subPages)}
            />
          </Column>
        </Row>
        <Seperator />
        <Row>
          <Column lg={12}>
            <UserFeedbackAppPageEntry
              {...getSubPage("userfeedback_summary", content.subPages)}
            />
          </Column>
        </Row>
        <UserFeedbackSendbox elements={content.elements} />
      </MultipleUserFeedback>
    </div>
  );
}
