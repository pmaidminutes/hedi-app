import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPage } from "@/modules/page/types";
import { CategoryRootProps, getCategoryRoot } from "../../query";

export type CategoryRootPage = IPage & CategoryRootProps;

export const getCategoryRootPage = async (
  content: IPage
): Promise<CategoryRootPage & IPageConfig> => {
  content.type = "CategoryRoot";
  const layout: ILayout = {
    pageLayout: "blank",
  };

  const data = await getCategoryRoot(content.lang);
  const shell: IPageConfig = {
    useHeader: true,
    layout,
  };

  return {
    ...data,
    ...content,
    ...shell,
  };
};
