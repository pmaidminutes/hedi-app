// import { MapClient } from "@/modules/map/client/components";
// import { Location } from "@/modules/map/types";
import { ITyped } from "@/modules/model";
import { Column, Grid, Row } from "carbon-components-react";
import { Contact } from "../Contact";
import { ProfileEntry } from "../ProfileEntry";
import { BgImgContainer } from "@/modules/common/components";
import { Services } from "../Services";
import { LanguageSkills } from "../LanguageSkills";
import { RelatedProfiles } from "../RelatedProfiles";
import { ProfileView } from "../../../types";
import { getProfileViewData } from "./getProfileViewData";
import { transformProfile, IProfileViewProps } from "./transformProfile";
import { useEditProfileButton, useServices } from "../../hooks";

// const locations: Location[] = [];

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
    lang,
    route,
    elements,
    links,
    services,
  } = transformProfile(props);

  const {
    servicesHeadline,
    languagesHeadline,
    contactHeadline,
    relatedHeadline,
    officeHrsHeadline,
  } = getProfileViewData(elements, links, lang);

  const { editButtonProps } = useEditProfileButton(
    lang,
    route,
    elements,
    links
  );
  const { hasServices } = useServices(services);

  return (
    <>
      <BgImgContainer>
        <Grid>
          <ProfileEntry
            isNarrow={false}
            editButtonProps={editButtonProps}
            {...profileEntryData}
          />
        </Grid>
      </BgImgContainer>
      <Grid className="hedi--profile">
        <Row>
          {hasServices ? (
            <Column lg={6} md={4}>
              <Services
                headline={servicesHeadline}
                {...servicesData}
                headlineType="h3"
              />
            </Column>
          ) : null}
          <Column lg={6} md={4}>
            <Contact
              officeHrsHeadline={officeHrsHeadline}
              headline={contactHeadline}
              {...contactData}
            />
          </Column>
          <Column lg={4} md={4}>
            <LanguageSkills headline={languagesHeadline} {...languagesData} />
          </Column>
        </Row>
      </Grid>
      <RelatedProfiles headline={relatedHeadline} {...relatedProfilesData} />
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
