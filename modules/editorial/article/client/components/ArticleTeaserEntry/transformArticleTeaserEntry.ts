import { IBreadCrumbProps } from "@/modules/shell/client/components/BreadCrumb/transformBreadCrumb";
import { IArticleTeaser } from "../../../types";

export function transformArticleTeaserEntry(props: IArticleTeaser) {
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

  return { label, breadcrumbData, summary, image, route };
}
