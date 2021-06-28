import { IBreadCrumbProps } from "@/modules/shell/client/components/BreadCrumb/transformBreadCrumb";
import { IArticleEntry } from "../../../types";

export function transformArticleTeaserEntry(props: IArticleEntry) {
  const {
    label,
    route,
    routelabel,
    appStyle,
    lang,
    type,
    summary,
    image,
  } = props;

  const breadcrumbData: IBreadCrumbProps = {
    label,
    routelabel,
    lang,
    route,
    type,
    appStyle,
    breadcrumbType: "withoutTitle",
  };

  const gridClass =
    image !== undefined ? "hedi--article-teaser__entry--grid" : undefined;

  return {
    label,
    breadcrumbData,
    summary,
    image,
    route,
    background: image?.color || "transparent",
    gridClass,
  };
}
