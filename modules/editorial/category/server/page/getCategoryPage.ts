import { ICategory } from "../../types";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import {
  findLinkInstance,
  imageToImageComponent,
} from "@/modules/components/types";
import { getPageById } from "@/modules/page/server";
import { IBreadCrumbProps } from "@/modules/shell/client/components/BreadCrumb/transformBreadCrumb";

export const getCategoryPage = async (
  content: ICategory
): Promise<ICategory & IPageConfig> => {
  const { lang, route, routelabel, label, appStyle } = content;
  const { components } = await getPageById(lang, "categoryDefinition");
  const backLink = findLinkInstance(components, "beforeBreadcrumbLink");
  const breadcrumb: IBreadCrumbProps = {
    breadcrumbType: "standard",
    lang,
    routelabel,
    route,
    label,
    type: "Article",
    appStyle,
    backLink,
  };

  const layout: ILayout = {
    pageLayout: "category",
    posterImage: imageToImageComponent(content.image) || null,
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
