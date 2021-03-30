import { MapClient } from "@/modules/map/client/components";
import { Location } from "@/modules/map/types";
import { ITyped } from "@/modules/model";
import { Column, Grid, Row } from "carbon-components-react";
import { Contact } from "../Contact";
import { ProfileEntry } from "../ProfileEntry";
import { BgImgContainer } from "@/modules/common/components";
import { Services } from "../Services";
import { LanguageSkills } from "../LanguageSkills";
import { RelatedProfiles } from "../RelatedProfiles";
import { IProfileViewProps, useProfile } from "./useProfile";
import { ProfileView } from "../../../query/getProfile";

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
    // mapData, HACK currently incompatible
    hasServices,
  } = useProfile(props);

  return (
    <>
      <BgImgContainer>
        <Grid>
          <ProfileEntry isNarrow={false} {...profileEntryData} />
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
