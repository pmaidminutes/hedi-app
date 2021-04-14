import { HTMLWithNextImage } from "@/modules/react/html";
import { Column, Grid, Row } from "carbon-components-react";
import { ILayoutBasicTemplate } from "../transformLayout";

export const SingleColumn: React.FC<ILayoutBasicTemplate> = ({
  headline,
  condensed,
  narrow,
  children,
  groupClass,
  body,
}) => (
  <Grid>
    <Row condensed={condensed} narrow={narrow}>
      <Column className="hedi--titlegroup">
        <h1>{headline}</h1>
        <HTMLWithNextImage data={body} />
      </Column>
    </Row>
    {children && <div className={groupClass}>{children}</div>}
  </Grid>
);
