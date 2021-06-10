import { ICategory } from "../../types";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPage } from "@/modules/page/types";
import { getCategoryRoot } from "../../query";

export type ICategoryRootPage = IPage & {
  categories: ICategory[];
};

export const getCategoryRootPage = async (
  content: IPage
): Promise<ICategoryRootPage & IPageConfig> => {
  content.type = "CategoryRoot";
  const layout: ILayout = {
    pageLayout: "editorial",
  };

  const categories = await getCategoryRoot(content.lang);
  const shell: IPageConfig = {
    useHeader: true,
    layout,
  };

  return {
    categories,
    ...content,
    ...shell,
  };
};
