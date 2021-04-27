import { Column, Grid, Row, AspectRatio } from "carbon-components-react";
import React from "react";
import { ILayoutBasicTemplate } from "../types";

export const Categories: React.FC<Omit<ILayoutBasicTemplate, "body">> = ({
  children,
  groupClass,
  headline,
}) => {
  return (
    <Grid>
      <Row>
        <Column sm={4} md={5} lg={10}>
          <AspectRatio ratio="2x1">
            <img
              src={process.env.NEXT_PUBLIC_ARTICLE_HEADER_TMP}
              alt="illustration of sleeping family"
              className="hedi-header-image"
              style={{ maxWidth: "100%" }}
            />
          </AspectRatio>
        </Column>
        <Column sm={4} lg={6}>
          <h2>{headline}</h2>
        </Column>
      </Row>
      {children && <div className={groupClass}>{children}</div>}
    </Grid>
  );
};
