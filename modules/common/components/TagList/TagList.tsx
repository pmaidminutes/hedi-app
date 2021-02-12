import { ITagged } from "@/modules/model";
import { Tag } from "../Tag";
import { Grid, Row, Column } from "carbon-components-react";

export const TagList = ({ tags }: ITagged): JSX.Element => {
  return (
    <Grid>
      <h3>Browse by tags</h3>
      <Row>
        <Column sm={4} md={6} lg={10}>
          {tags.map(tag => (
            <Tag tag={tag} key={tag.route} />
          ))}
        </Column>
      </Row>
    </Grid>
  );
};
