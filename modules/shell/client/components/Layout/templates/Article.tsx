import { Column, ColumnDefaultProps, Grid, Row } from "carbon-components-react";
import { BreadCrumb } from "../../BreadCrumb";
import { IBreadCrumbProps } from "../../BreadCrumb/transformBreadCrumb";
import { ILayoutBasicTemplate } from "../types";

export const Article: React.FC<
  ILayoutBasicTemplate & {
    columnProps?: ColumnDefaultProps;
    breadcrumbs: IBreadCrumbProps | null;
  }
> = ({
  headline,
  condensed,
  narrow,
  children,
  groupClass,
  columnProps,
  breadcrumbs,
}) => (
  <Grid className="hedi--article-page">
    <Row condensed={condensed} narrow={narrow}>
      <Column {...columnProps} className="hedi--titlegroup">
        {breadcrumbs && <BreadCrumb {...breadcrumbs} />}
        <h1>{headline}</h1>
      </Column>
    </Row>
    {children && <div className={groupClass}>{children}</div>}
  </Grid>
);
