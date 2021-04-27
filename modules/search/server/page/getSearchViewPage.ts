import { IAppPage } from "@/modules/common/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getSearchView } from "../../query";

export const getSearchViewPage = async (
  route: string
): Promise<(IAppPage & IPageConfig) | null> => {
  const content = await getSearchView(route);

  if (!content) return null;

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
