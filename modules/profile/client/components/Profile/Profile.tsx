// import { MapClient } from "@/modules/map/client/components";
// import { Location } from "@/modules/map/types";
import { ITyped } from "@/modules/model";
import { Column, Grid, Row } from "carbon-components-react";
import { Edit24 } from "@carbon/icons-react";
import { Contact, parseFromProfile } from "../Contact";
import { ProfileEntry } from "../ProfileEntry";
import { BgImgContainer } from "@/modules/common/components";
import { ServiceGroup } from "../ServiceGroup";
import { LanguageSkills } from "../LanguageSkills";
import { RelatedProfiles } from "../RelatedProfiles";
import { isIProfile, ProfileView } from "../../../types";
import { transformProfileToEntry } from "@/modules/profile/utils";

// const locations: Location[] = [];

export const TryProfile = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null => {
  return isIProfile(content) ? (
    <Profile content={content as ProfileView} />
  ) : null;
};

export const Profile = ({ content }: { content: ProfileView }) => {
  const profileEntry = transformProfileToEntry(content);
  // const profileEntry definition from components
  // TODO components->editButton
  /* {editButtonProps?.isShowing ? (
        <Button
          kind="ghost"
          size="sm"
          renderIcon={Edit24}
          href={editButtonProps.link}>
          {editButtonProps.text}
        </Button>
      ) : null} */

  const contacts = parseFromProfile(content);
  // contactDefinition from components;

  return (
    <>
      <BgImgContainer>
        <Grid>
          <ProfileEntry {...profileEntry}>{/*editbutton*/}</ProfileEntry>
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
            {/* */}
            {contacts.map(contact => (
              <Contact {...contact} key={contact.dataKind.label} />
            ))}
          </Column>
          <Column lg={4} md={4}>
            {/* <LanguageSkills headline={languagesHeadline} {...languagesData} /> */}
          </Column>
        </Row>
      </Grid>
      {/* <RelatedProfiles headline={relatedHeadline} {...relatedProfilesData} /> */}
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
