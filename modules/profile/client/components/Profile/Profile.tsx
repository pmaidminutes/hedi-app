import { ITyped } from "@/modules/model";
import { ICaregiver, IMidwife } from "@/modules/profile/types";
import { Column, Grid, Row } from "carbon-components-react";
import dynamic from "next/dynamic";
import { Address } from "../Address";
import { Contact } from "../Contact";
import { DetailedName } from "../DetailedName";
interface IProfileProps {
  content: ICaregiver | IMidwife;
}

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
const MapWithNoSSR = dynamic<any>(
  () => import("@/modules/common/components/MapClient/MapClient"),
  {
    ssr: false,
  }
);
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
      </Grid>
      <MapWithNoSSR />
    </>
  );
};
