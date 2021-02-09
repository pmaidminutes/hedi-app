import { MapClient } from "@/modules/map/client/components";
import { Location } from "@/modules/map/types";
import { ITyped } from "@/modules/model";
import {
  ICaregiver,
  IInstitution,
  IMidwife,
  IOrganisation,
} from "@/modules/profile/types";
import { Column, Grid, Row } from "carbon-components-react";
import { Address } from "../Address";
import { Contact } from "../Contact";
import { DetailedName } from "../DetailedName";
interface IProfileProps {
  content: ICaregiver | IMidwife;
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
        <Row>
          <Column lg={16}>
            <DetailedName content={content} />
          </Column>
          <Column sm={3} md={4} lg={8}>
            <Address content={content} />
          </Column>

          <Column sm={3} md={4} lg={8}>
            <Contact content={content} />
          </Column>
        </Row>
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
