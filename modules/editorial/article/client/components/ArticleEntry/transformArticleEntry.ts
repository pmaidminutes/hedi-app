import { ICopyLinkToClipboard } from "@/modules/common/components/CopyLinkToClipboard/transformCopyLinkToClipboard";
import { IHeadlineComponent } from "@/modules/components";
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
  const { label, route, type, lang, routelabel, appStyle, summary } = article;
  const headline: IHeadlineComponent & ICopyLinkToClipboard = {
    kind: "Headline",
    headline: "h2",
    text: label ?? "",
    route,
    type: "icon",
    size: "sm",
    id: label,
  };
  const breadcrumbType: BreadcrumbType =
    withGraphicalBreadcrumb !== undefined && withGraphicalBreadcrumb === true
      ? "graphical"
      : "withoutTitle";
  // TODO check if breadcrumb type works here for all cases
  return {
    label,
    route,
    summary,
    breadcrumbData: {
      label,
      routelabel,
      route,
      type,
      lang,
      appStyle,
      breadcrumbType,
    },
    headline,
  };
}
