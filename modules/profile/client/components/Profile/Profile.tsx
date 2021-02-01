import { MapClient } from "@/modules/common/components";
import { ITyped } from "@/modules/model";
import { ICaregiver, ILocation, IMidwife } from "@/modules/profile/types";
import { Column, Grid, Row } from "carbon-components-react";
import { Address } from "../Address";
import { Contact } from "../Contact";
import { DetailedName } from "../DetailedName";
interface IProfileProps {
  content: ICaregiver | IMidwife;
}
const locations: ILocation[] = [];

export const TryProfile = (content: ITyped): JSX.Element | null => {
  switch (content.type) {
    case "Midwife":
      return <Profile content={content as ICaregiver} />;
    case "Caregiver":
      return <Profile content={content as IMidwife} />;
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
        {locations.push({
          lat: content.lat,
          long: content.long,
          name: content.name,
        } as ILocation)}
        <MapClient currentLocation={locations[0]} locations={locations} />
      </Grid>
    </>
  );
};
