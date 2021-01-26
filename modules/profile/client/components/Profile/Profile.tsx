import { ICaregiver } from "../../../types";
import { Address } from "../Address";
import { Contact } from "../Contact";
import { DetailedName } from "../DetailedName";
import { Grid, Row, Column } from "carbon-components-react";

interface IProfileProps {
  content: ICaregiver;
}

export const Profile = ({ content }: IProfileProps) => {
  return (
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
  );
};
