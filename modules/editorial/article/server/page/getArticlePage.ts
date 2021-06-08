import { IArticle } from "../../types";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";

export const getArticlePage = async (
  content: IArticle
): Promise<IArticle & IPageConfig> => {
  const layout: ILayout = {
    pageLayout: "singleColumn",
    singleColumnProps: {
      sm: 4,
      md: { span: 6, offset: 1 },
      lg: { span: 8, offset: 4 },
    },
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
