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
interface IProfileProps {
  content: ICaregiver | IMidwife | IOrganisation | IInstitution;
}
const locations: Location[] = [];

export const TryProfile = (content: ITyped): JSX.Element | null => {
  switch (content.type) {
    case "Midwife":
      return <Profile content={content as ICaregiver} />;
    case "Caregiver":
      return <Profile content={content as IMidwife} />;
    case "Organisation":
      return <Profile content={content as IOrganisation} />;
    case "Institution":
      return <Profile content={content as IInstitution} />;
    default:
      return null;
  }
};

export const Profile = ({ content }: IProfileProps) => {
  return (
    <>
      <Grid>
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
            <LanguageSkills languageSkills={content.languageSkills} />
          </Column>
        </Row>

        <Row>
          <Column lg={16}>{/* <DetailedName content={content} /> */}</Column>
          <Column sm={3} md={4} lg={8}>
            <Address content={content} />
          </Column>
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
