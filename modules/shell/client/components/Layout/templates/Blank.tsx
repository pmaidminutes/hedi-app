import { ColumnDefaultProps, Grid } from "carbon-components-react";
import { ILayoutBasicTemplate } from "../types";

export const Blank: React.FC<
  ILayoutBasicTemplate & {
    columnProps?: ColumnDefaultProps;
  }
> = ({ children, groupClass }) => (
  <Grid className="hedi--page-grid">
    {children && <div className={groupClass}>{children}</div>}
  </Grid>
);
