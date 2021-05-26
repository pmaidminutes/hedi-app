import { ILayoutBasicTemplate } from "../types";
import { HTML } from "@/modules/react/html";
import { Column, ColumnDefaultProps, Grid, Row } from "carbon-components-react";
import { IComponent } from "@/modules/model/components";
import { Renderer } from "@/modules/common/components";

export const TwoColumns: React.FC<
  ILayoutBasicTemplate & {
    sideComponents?: IComponent[];
    left?: ColumnDefaultProps;
    right?: ColumnDefaultProps;
  }
> = ({
  headline,
  body,
  sideComponents,
  condensed,
  narrow,
  left,
  right,
  children,
  groupClass,
}) => (
  <Grid>
    <Row>
      <Column {...left} className="hedi-app-page-image-wrapper">
        {sideComponents && <Renderer components={sideComponents} />}
      </Column>

      <Column {...right} className="hedi--col--grid-nest">
        <Grid>
          <Row condensed={condensed} narrow={narrow}>
            <Column className="hedi--titlegroup">
              <h1>{headline}</h1>
              <HTML data={body} />
            </Column>
          </Row>
          {children && <div className={groupClass}>{children}</div>}
        </Grid>
      </Column>
    </Row>
  </Grid>
);
