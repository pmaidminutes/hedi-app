import {
  findLabelInstance,
  findLinkInstance,
  imageToImageComponent,
} from "@/modules/components";
import { IPage } from "@/modules/page/types";
import { IBreadCrumbProps } from "@/modules/shell/client/components/BreadCrumb/transformBreadCrumb";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";

export const getSearchPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "Search";
  const { lang, route, label, components } = content;

  const backLink = findLinkInstance(components, "beforeBreadcrumbLink");

  const breadcrumb: IBreadCrumbProps = {
    breadcrumbType: "withoutTitle",
    lang,
    routelabel: label,
    route,
    label,
    type: "Search",
    backLink,
  };

  const layout: ILayout = {
    pageLayout: "category",
    breadcrumbs: { ...breadcrumb },
  };

  const shell: IPageConfig = {
    useHeader: true,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
