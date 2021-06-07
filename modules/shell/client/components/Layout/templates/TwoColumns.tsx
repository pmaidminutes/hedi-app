import { ILayoutBasicTemplate } from "../types";
import { Column, ColumnDefaultProps, Grid, Row } from "carbon-components-react";
import { IComponent } from "@/modules/model/components";
import { ComponentRenderer } from "@/modules/components";

export const TwoColumns: React.FC<
  ILayoutBasicTemplate & {
    sideComponents?: IComponent[];
    left?: ColumnDefaultProps;
    right?: ColumnDefaultProps;
  }
> = ({
  headline,
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
        {sideComponents && <ComponentRenderer components={sideComponents} />}
      </Column>

      <Column {...right} className="hedi--col--grid-nest">
        <Grid>
          <Row condensed={condensed} narrow={narrow}>
            <Column className="hedi--titlegroup">
              <h1>{headline}</h1>
            </Column>
          </Row>
          {children && <div className={groupClass}>{children}</div>}
        </Grid>
      </Column>
    </Row>
  </Grid>
);
