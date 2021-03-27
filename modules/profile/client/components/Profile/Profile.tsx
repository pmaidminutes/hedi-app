import { MapClient } from "@/modules/map/client/components";
import { Location } from "@/modules/map/types";
import { ITyped } from "@/modules/model";
import { Column, Grid, Row, Button } from "carbon-components-react";
import { Contact } from "../Contact";
import { ProfileEntry } from "../ProfileEntry";
import { BgImgContainer } from "@/modules/common/components";
import { Services } from "../Services";
import { LanguageSkills } from "../LanguageSkills";
import { RelatedProfiles } from "../RelatedProfiles";
import { IProfileViewProps, useProfile } from "./useProfile";
import { ProfileView } from "@/modules/profile/query/getProfile";
import { getUser } from "@/modules/auth/client";
import { tryGetValue } from "@/modules/common/utils";
import { getCurrentUserProfile } from "@/modules/profile/request/getCurrentUserProfile";
import { Edit24 } from "@carbon/icons-react";

const locations: Location[] = [];

export const TryProfile = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null => {
  if (
    ["Midwife", "Caregiver", "Organisation", "Institution"].includes(
      content.type
    )
  )
    return <Profile content={content as ProfileView} />;
  else return null;
};

export const Profile = (props: IProfileViewProps) => {
  const {
    languagesData,
    profileEntryData,
    servicesData,
    contactData,
    relatedProfilesData,
    mapData,
    hasServices,
  } = useProfile(props);

  const [user, userIsLoading] = getUser();
  const [currentProfile, currentProfileLoading] = getCurrentUserProfile(
    user,
    props.content.lang
  );

  return (
    <>
      <BgImgContainer>
        <Grid>
          {!currentProfileLoading &&
            !userIsLoading &&
            currentProfile &&
            currentProfile.route == props.content.route && (
              <Row narrow>
                <Button
                  size="sm"
                  kind="secondary"
                  renderIcon={Edit24}
                  href={"/" + props.content.lang + "/user/profile/edit"}>
                  {tryGetValue("edit_button", props.content.elements)}{" "}
                </Button>
              </Row>
            )}
          <ProfileEntry isNarrow={true} {...profileEntryData} />
        </Grid>
      </BgImgContainer>
      <Grid className="hedi--profile">
        <Row>
          {hasServices ? (
            <Column lg={6} md={4}>
              <Services {...servicesData} headlineType="h3" />
            </Column>
          ) : null}
          <Column lg={6} md={4}>
            <Contact {...contactData} />
          </Column>
          <Column lg={4} md={4}>
            <LanguageSkills {...languagesData} />
          </Column>
        </Row>
      </Grid>
      <RelatedProfiles {...relatedProfilesData} />
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
