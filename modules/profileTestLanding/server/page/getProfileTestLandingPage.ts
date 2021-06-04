import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/page/types";
import { fixupRoutes } from "..";

export const getProfileTestLandingPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "ProfileTestLandingPage";
  content = fixupRoutes(content);

  const layoutImg = {
    alt: "Beschreibung",
    src: `${process.env.NEXT_PUBLIC_IMG_HEADER_SIMPLE}`,
  };

  const layout: ILayout = {
    rightColumnProps: { md: 4, lg: 6, xlg: 6 },
    layoutImg,
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
