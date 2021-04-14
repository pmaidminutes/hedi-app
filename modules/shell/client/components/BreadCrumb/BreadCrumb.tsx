import { transformBreadCrumb, IBreadCrumbProps } from "./transformBreadCrumb";
import {
  Grid,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Column,
} from "carbon-components-react";

export const BreadCrumb: React.FunctionComponent<IBreadCrumbProps> = (
  props: IBreadCrumbProps
): JSX.Element => {
  const { breadCrumbPath, isCurrentPage, lang } = transformBreadCrumb(props);

  return (
    <Grid>
      <Row>
        <Column>
          <Breadcrumb aria-label="breadcrumb" noTrailingSlash>
            <BreadcrumbItem href={`/${lang}`} isCurrentPage={isCurrentPage}>
              Home
            </BreadcrumbItem>

            {breadCrumbPath.map((crumb, index) => (
              <BreadcrumbItem
                key={crumb.label + index}
                isCurrentPage={crumb.isCurrentPage}
                href={crumb.route}>
                {crumb.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </Column>
      </Row>
    </Grid>
  );
};
