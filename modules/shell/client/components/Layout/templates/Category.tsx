import { Column, ColumnDefaultProps, Grid, Row } from "carbon-components-react";
import { BreadCrumb } from "../../BreadCrumb";
import { IBreadCrumbProps } from "../../BreadCrumb/transformBreadCrumb";
import { ILayoutBasicTemplate } from "../types";

export const Category: React.FC<
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
  <Grid className="hedi--page-grid hedi--page-grid__category">
    <Row narrow={true} className="hedi--outside-headline">
      <div className="hedi--titlegroup">
        {breadcrumbs && <BreadCrumb {...breadcrumbs} />}
        <h1>{headline}</h1>
      </div>
    </Row>
    {children && <div className={groupClass}>{children}</div>}
  </Grid>
);
