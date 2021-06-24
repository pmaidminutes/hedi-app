import { IRouteLabeled } from "@/modules/model";
import { BreadcrumbType } from "@/modules/shell/client/components/BreadCrumb/transformBreadCrumb";
import { IArticleEntry } from "../../../types";

export interface IArticleEntryProps {
  article: IArticleEntry;
  withGraphicalBreadcrumb?: boolean;
}
export function transformArticleEntry({
  article,
  withGraphicalBreadcrumb,
}: IArticleEntryProps) {
  const { label, route, type, lang, routelabel, appStyle } = article;

  const breadcrumbType: BreadcrumbType =
    withGraphicalBreadcrumb !== undefined && withGraphicalBreadcrumb === true
      ? "graphical"
      : "withoutTitle";
  // TODO check if breadcrumb type works here for all cases
  return {
    label,
    route,
    breadcrumbData: {
      label,
      routelabel,
      route,
      type,
      lang,
      appStyle,
      breadcrumbType,
    },
  };
}
