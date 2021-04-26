import { Column, Grid, Row } from "carbon-components-react";
import React from "react";
import { ILayoutBasicTemplate } from "../types";

export const Editorial: React.FC<ILayoutBasicTemplate> = ({ children }) => {
  return (
    <Grid>
      <Row>
        <Column sm={4} md={{ span: 6, offset: 1 }} lg={{ span: 8, offset: 4 }}>
          {children}
        </Column>
      </Row>
    </Grid>
  );
};
