import { IArticle, IArticleView } from "../../types";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { findLinkInstance, imageToImageComponent } from "@/modules/components";
import { getPageById } from "@/modules/page/server";
import { IBreadCrumbProps } from "@/modules/shell/client/components/BreadCrumb/transformBreadCrumb";

export const getArticlePage = async (
  content: IArticle
): Promise<IArticleView & IPageConfig> => {
  const { lang, route, routelabel, label, appStyle } = content;
  const posterImage = content.category.image;

  const { components } = await getPageById(lang, "articleDefinition");

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
    pageLayout: "article",
    singleColumnProps: {
      sm: 4,
      md: { span: 6, offset: 1 },
      lg: { span: 10, offset: 3 },
    },
    breadcrumbs: { ...breadcrumb },
    posterImage: imageToImageComponent(posterImage),
    pageType: "Article",
  };

  const shell: IPageConfig = {
    useHeader: true,
    layout,
  };
  return {
    ...content,
    uiComponents: components,
    ...shell,
  };
};
