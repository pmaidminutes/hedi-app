import { Column, Grid, Row } from "carbon-components-react";
import React from "react";
import { ILayoutBasicTemplate } from "../types";

export const Editorial: React.FC<ILayoutBasicTemplate> = ({
  children,
  groupClass,
}) => {
  return (
    <Grid>
      <Row>
        <Column sm={4} md={{ span: 6, offset: 1 }} lg={{ span: 8, offset: 4 }}>
          {children && <div className={groupClass}>{children}</div>}
        </Column>
      </Row>
    </Grid>
  );
};
