import { IPage } from "@/modules/page/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";

export const getSearchPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "Search";

  const layout: ILayout = {
    pageLayout: "singleColumn",
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
