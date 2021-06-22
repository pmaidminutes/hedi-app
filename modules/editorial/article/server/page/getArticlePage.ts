import { IArticle } from "../../types";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { imageToImageComponent } from "@/modules/components";

export const getArticlePage = async (
  content: IArticle
): Promise<IArticle & IPageConfig> => {
  const posterImage = content.category.image;
  const layout: ILayout = {
    pageLayout: "article",
    singleColumnProps: {
      sm: 4,
      md: { span: 6, offset: 1 },
      lg: { span: 10, offset: 2 },
    },
    breadcrumbs: { ...content },
    posterImage: imageToImageComponent(posterImage),
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
