// import { MapClient } from "@/modules/map/client/components";
// import { Location } from "@/modules/map/types";
import { ITyped } from "@/modules/model";
import { Column, Grid, Row } from "carbon-components-react";
import { BgImgContainer } from "@/modules/common/components";
import { IPage } from "@/modules/page/types";

import { isIProfile, IProfile } from "../../../types";
import {
  getProfileViewContent,
  getProfileViewDefinition,
  useShowProfileEditButton,
} from ".";

import { ProfileEntry, IProfileEntryDefinition } from "../ProfileEntry";
import {
  RelatedProfiles,
  IRelatedProfilesDefinition,
} from "../RelatedProfiles";
import { Contact, IContactDefinition } from "../Contact";
// TODO
import { ServiceGroup } from "../ServiceGroup";
import { LanguageSkills } from "../LanguageSkills";

import { Edit24 } from "@carbon/icons-react";
import { IButtonComponent } from "@/modules/components/types";
import { Button } from "@/modules/components";

export type IProfileView = IProfile & Pick<IPage, "components">;

export const TryProfile = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null => {
  return isIProfile(content) ? (
    <ProfileView content={content as IProfileView} />
  ) : null;
};

export interface IProfileViewDefinition {
  profileEntryDefinition: IProfileEntryDefinition;
  profileEditButton?: IButtonComponent;
  contactDefinition: IContactDefinition;
  relatedProfilesDefinition: IRelatedProfilesDefinition;
}

export const ProfileView = ({ content }: { content: IProfileView }) => {
  const { profileEntry, contacts, relatedProfiles } = getProfileViewContent(
    content
  );

  const {
    profileEntryDefinition,
    profileEditButton,
    contactDefinition,
    relatedProfilesDefinition,
  } = getProfileViewDefinition(content.components);

  const showProfileEditButton = useShowProfileEditButton(content);
  return (
    <>
      <BgImgContainer>
        <Grid>
          <ProfileEntry {...profileEntry} {...profileEntryDefinition}>
            {showProfileEditButton && profileEditButton && (
              <Button renderIcon={Edit24} size="sm" {...profileEditButton} />
            )}
          </ProfileEntry>
        </Grid>
      </BgImgContainer>
      <Grid className="hedi--profile">
        <Row>
          {/*hasServices && (
            <Column lg={6} md={4}>
              <ServiceGroup
                headline={servicesHeadline}
                {...servicesData}
                headlineType="h3"
              />
            </Column>
          )*/}
          <Column lg={6} md={4}>
            {contacts.map(contact => (
              <Contact
                {...contact}
                {...contactDefinition}
                key={contact.dataKind.label}
              />
            ))}
          </Column>
          <Column lg={4} md={4}>
            {/* <LanguageSkills headline={languagesHeadline} {...languagesData} /> */}
          </Column>
        </Row>
      </Grid>
      {relatedProfiles.length > 0 && (
        <RelatedProfiles
          profileLinks={relatedProfiles}
          {...relatedProfilesDefinition}
        />
      )}
      {/* {hasMap)
          ? content.associations.map((entry: IProfile) => {
              return <ProfileEntry profile={entry} key={entry.route} />;
            })
          : content.members.map((entry: IProfile) => {
              return <ProfileEntry profile={entry} key={entry.route} />;
            })}
        {
          //TODO to verify the state availablility of array
          locations.push({
            lat: content.lat,
            long: content.long,
            displayName: content.displayName,
          } as Location)
        } */}
      {/* <MapClient {...mapData} /> */}
    </>
  );
};
