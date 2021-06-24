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
  const {
    breadCrumbPath,
    isCurrentPage,
    lang,
    breadcrumbType,
    breadcrumbClass,
  } = transformBreadCrumb(props);

  if (breadcrumbType === "graphical") {
    return (
      <div className="hedi--breadcrumb__graphical">
        <div />
      </div>
    );
  }

  return (
    <Breadcrumb
      aria-label="breadcrumb"
      noTrailingSlash
      className={breadcrumbClass}>
      {/* <BreadcrumbItem href={`/${lang}`} isCurrentPage={isCurrentPage}>
        Home
      </BreadcrumbItem> */}

      {breadCrumbPath.map((crumb, index) => {
        if (breadcrumbType === "withoutTitle") {
          if (index + 1 !== breadCrumbPath.length) {
            return (
              <BreadcrumbItem
                className={index === 0 ? "hedi--breadcrumb__main-category" : ""}
                key={crumb.label + index}
                isCurrentPage={crumb.isCurrentPage}
                href={crumb.route}>
                {crumb.label}
              </BreadcrumbItem>
            );
          }
        } else {
          return (
            <BreadcrumbItem
              className={index === 0 ? "hedi--breadcrumb__main-category" : ""}
              key={crumb.label + index}
              isCurrentPage={crumb.isCurrentPage}
              href={crumb.route}>
              {crumb.label}
            </BreadcrumbItem>
          );
        }
      })}
    </Breadcrumb>
  );
};
