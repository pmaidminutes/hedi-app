import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/page/types";
import { fixupRoutes } from "..";

export const getProfileTestLandingPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "ProfileTestLandingPage";
  content = fixupRoutes(content);

  const layout: ILayout = {
    rightColumnProps: { md: 4, lg: 6, xlg: 6 },
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
