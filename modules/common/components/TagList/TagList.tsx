import { ITagged } from "@/modules/model";
import { Tag } from "../Tag";
import { Grid, Row, Column } from "carbon-components-react";

export const TagList = ({ tags }: ITagged): JSX.Element => {
  return (
    <Grid className="mb-l-sm">
      <h3 className="mt-s-md">Browse by tags</h3>
      <Row className="mt-s-sm">
        <Column sm={4} md={6} lg={10}>
          {tags.map(tag => (
            <Tag tag={tag} key={tag.route} />
          ))}
        </Column>
      </Row>
    </Grid>
  );
};
