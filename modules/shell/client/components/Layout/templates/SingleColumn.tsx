import { HTML } from "@/modules/react/html";
import { Column, ColumnDefaultProps, Grid, Row } from "carbon-components-react";
import { ILayoutBasicTemplate } from "../types";

export const SingleColumn: React.FC<
  ILayoutBasicTemplate & {
    columnProps?: ColumnDefaultProps;
  }
> = ({
  headline,
  condensed,
  narrow,
  children,
  groupClass,
  columnProps,
}) => (
  <Grid>
    <Row condensed={condensed} narrow={narrow}>
      <Column {...columnProps} className="hedi--titlegroup">
        <h1>{headline}</h1>
      </Column>
    </Row>
    {children && <div className={groupClass}>{children}</div>}
  </Grid>
);
