import { MapClient } from "@/modules/map/client/components";
import { Location } from "@/modules/map/types";
import { ITyped } from "@/modules/model";
import { IProfile } from "@/modules/model/IProfile";
import {
  ICaregiver,
  IInstitution,
  IMidwife,
  IOrganisation,
  isICaregiver,
  isIMidwife,
} from "@/modules/profile/types";
import { Column, Grid, Row } from "carbon-components-react";
import { Address } from "../Address";
import { Contact } from "../Contact";
import { DetailedName } from "../DetailedName";
import { ProfileEntry } from "../ProfileEntry";
import { RowWithBg } from "@/modules/common/components";
import { Services } from "../Services";
import { LanguageSkills } from "../LanguageSkills";
import { RelatedProfiles } from "../RelatedProfiles";
import { getTextInputProps } from "@/modules/common/utils";
import { IProfileViewProps, useProfile } from "./useProfile";
import { ProfileView } from "@/modules/profile/query/getProfile";

const locations: Location[] = [];

export const TryProfile = (content: ITyped): JSX.Element | null => {
  console.log({ content });
  switch (content.type) {
    case "Midwife":
      return <Profile content={content as ProfileView} />;
    case "Caregiver":
      return <Profile content={content as ProfileView} />;
    case "Organisation":
      return <Profile content={content as ProfileView} />;
    case "Institution":
      return <Profile content={content as ProfileView} />;
    default:
      return null;
  }
};

export const Profile = (props: IProfileViewProps) => {
  const { languagesData } = useProfile(props);
  const { content } = props;
  return (
    <>
      <Grid fullWidth={true}>
        <RowWithBg>
          <ProfileEntry profile={content} />
        </RowWithBg>

        <Row>
          <Column lg={8}>
            <Services />
          </Column>
          <Column lg={8}>
            <Contact content={content} />
          </Column>
          <Column lg={8}>
            <LanguageSkills {...languagesData} />
          </Column>
        </Row>
        <Row>
          <RelatedProfiles />
        </Row>
        {isICaregiver(content) || isIMidwife(content)
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
        }
        <MapClient currentLocation={locations[0]} locations={locations} />
      </Grid>
    </>
  );
};
