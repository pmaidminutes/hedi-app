import { IArticle, IArticleView } from "../../types";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { imageToImageComponent } from "@/modules/components";
import { getPageById } from "@/modules/page/server";

export const getArticlePage = async (
  content: IArticle
): Promise<IArticleView & IPageConfig> => {
  const { lang } = content;
  const posterImage = content.category.image;
  const layout: ILayout = {
    pageLayout: "article",
    singleColumnProps: {
      sm: 4,
      md: { span: 6, offset: 1 },
      lg: { span: 10, offset: 3 },
    },
    breadcrumbs: { ...content },
    posterImage: imageToImageComponent(posterImage),
  };

  const { components } = await getPageById(lang, "articleDefinition");
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
