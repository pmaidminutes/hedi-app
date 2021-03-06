import { transformBreadCrumb, IBreadCrumbProps } from "./transformBreadCrumb";
import {
  Grid,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Column,
} from "carbon-components-react";
import { ArrowLeft16 } from "@carbon/icons-react";

export const BreadCrumb: React.FunctionComponent<IBreadCrumbProps> = (
  props: IBreadCrumbProps
): JSX.Element => {
  const {
    breadCrumbPath,
    isCurrentPage,
    lang,
    breadcrumbType,
    breadcrumbClass,
    appStyle,
    backLink,
    backLinkBreadrcumbClass,
    breadcrumbItemClass,
  } = transformBreadCrumb(props);
  if (breadcrumbType === "graphical") {
    return (
      <div className={`hedi--breadcrumb__graphical`}>
        <div className={`${appStyle}--stroke`} />
      </div>
    );
  }

  return (
    <Breadcrumb
      aria-label="breadcrumb"
      noTrailingSlash
      className={breadcrumbClass}>
      {backLink !== null ? (
        <>
          <ArrowLeft16 />
          <BreadcrumbItem
            className={backLinkBreadrcumbClass}
            href={backLink?.href}>
            {backLink?.labelText}
          </BreadcrumbItem>
        </>
      ) : null}

      {breadCrumbPath.map((crumb, index) => {
        if (breadcrumbType === "withoutTitle") {
          if (index + 1 !== breadCrumbPath.length) {
            return (
              <BreadcrumbItem
                className={
                  index + 1 !== breadCrumbPath.length
                    ? "hedi--breadcrumb__main-category"
                    : ""
                }
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
              className={
                index + 1 !== breadCrumbPath.length
                  ? "hedi--breadcrumb__main-category"
                  : ""
              }
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
