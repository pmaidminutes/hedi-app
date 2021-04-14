import { ILayoutBasicTemplate } from "../transformLayout";
import { ILayoutImage } from "../../../../types";
import { HTMLWithNextImage } from "@/modules/react/html";
import { Column, ColumnDefaultProps, Grid, Row } from "carbon-components-react";

export const ImageAndColumn: React.FC<
  ILayoutBasicTemplate & {
    layoutImg?: ILayoutImage;
    left?: ColumnDefaultProps;
    right?: ColumnDefaultProps;
  }
> = ({
  headline,
  body,
  layoutImg,
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
        {!!layoutImg ? (
          <div className="hedi--app-page-image">
            <img src={layoutImg.src} alt={layoutImg?.alt ?? ""}></img>
          </div>
        ) : null}
      </Column>

      <Column {...right} className="hedi--col--grid-nest">
        <Grid>
          <Row condensed={condensed} narrow={narrow}>
            <Column className="hedi--titlegroup">
              <h1>{headline}</h1>
              <HTMLWithNextImage data={body} />
            </Column>
          </Row>

          {children && <div className={groupClass}>{children}</div>}
        </Grid>
      </Column>
    </Row>
  </Grid>
);
