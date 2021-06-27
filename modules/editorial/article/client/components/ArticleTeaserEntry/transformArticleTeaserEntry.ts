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

  const src = image ? process.env.NEXT_PUBLIC_ASSETS_URL + image.route : "";

  return { label, breadcrumbData, summary, image: { src }, route, src };
}
