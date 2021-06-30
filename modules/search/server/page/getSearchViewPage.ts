import { imageToImageComponent } from "@/modules/components";
import { IPage } from "@/modules/page/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";

export const getSearchPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "Search";

  const layout: ILayout = {
    pageLayout: "category",
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
