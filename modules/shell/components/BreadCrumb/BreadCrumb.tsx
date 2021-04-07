import { constructBreadCrumbPathData } from "../../server";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
  IRouteLabeled,
} from "@/modules/model";
import {
  Grid,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Column,
} from "carbon-components-react";

interface IBreadCrumbProps {
  content?: IEntityTranslated<IEntityLocalized> &
    Partial<IAppStyled> &
    Partial<IRouteLabeled>;
}

// UNUSED
export const BreadCrumb: React.FunctionComponent<IBreadCrumbProps> = (
  props: IBreadCrumbProps
): JSX.Element => {
  const content = props.content ?? null;
  const lang = content?.lang ?? "de";

  const breadCrumbPath = constructBreadCrumbPathData(content, lang ?? "de");

  return (
    <Grid>
      <Row>
        <Column>
          <Breadcrumb aria-label="breadcrumb" noTrailingSlash>
            <BreadcrumbItem
              href={`/${lang}`}
              isCurrentPage={breadCrumbPath.length === 0}>
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
