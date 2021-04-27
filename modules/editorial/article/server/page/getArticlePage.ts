import { IArticle } from "../../types";
import { getArticle } from "../../query";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";

export const getArticlePage = async (
  route: string
): Promise<(IArticle & IPageConfig) | null> => {
  const content = await getArticle(route);

  if (!content) return null;

  const layout: ILayout = {
    pageLayout: "singleColumn",
    singleColumnProps: {
      sm: 4,
      md: { span: 6, offset: 1 },
      lg: { span: 8, offset: 4 },
    },
  };

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    layout,
  };
  return {
    ...content,
    ...shell,
  };
};
