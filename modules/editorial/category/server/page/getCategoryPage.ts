import { ICategoryRoot } from "../../types";
import { getCategory, getCategoryRoot } from "../../query";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";

export const getCategoryPage = async (
  route: string
): Promise<(ICategoryRoot & IPageConfig) | null> => {
  // TODO how to add root to "categories"
  // return getCategoryRoot(locale);

  const content = await getCategory(route);

  if (!content) return null;

  const layout: ILayout = {
    pageLayout: "categories",
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
