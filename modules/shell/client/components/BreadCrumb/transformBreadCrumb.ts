import {
  IAppStyled,
  IEntity,
  ILocalized,
  IRouteLabeled,
} from "@/modules/model";
import { constructBreadCrumbPathData } from "../../../server";

export type BreadcrumbType = "standard" | "withoutTitle" | "graphical";
export interface IBreadCrumbProps extends IRouteLabeled, ILocalized, IEntity {
  breadcrumbType?: BreadcrumbType;
  appStyle?: string;
}

export function transformBreadCrumb(props: IBreadCrumbProps) {
  const { lang, breadcrumbType, appStyle } = props;

  const breadCrumbPath = constructBreadCrumbPathData(props);
  // TODO only works for SSG
  const isCurrentPage = breadCrumbPath.length === 0;

  const className = "hedi--breadcrumb";
  const breadcrumbClass = appStyle
    ? `${className} ${appStyle}--article-entry__breadcrumb`
    : className;

  return {
    breadCrumbPath,
    isCurrentPage,
    lang,
    breadcrumbType: breadcrumbType !== undefined ? breadcrumbType : "standard",
    breadcrumbClass,
  };
}
