import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import { getLandingPageView } from "../../client/request";
import { IPageConfig } from "@/modules/shell/types";
import { landingPagePaths } from "../../types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";

export const getLandingPage = async (
  route: string
): Promise<(IAppPage & IPageConfig) | null> => {
  if (
    !landingPagePaths.find(
      path => route == segmentsToRoute(path.params?.segments || [], path.locale)
    )
  )
    return null;

  const content = await getLandingPageView(route);

  if (!content) return null;
  const layoutImg = {
    alt: "Beschreibung",
    src: `${process.env.NEXT_PUBLIC_IMG_HEADER_SIMPLE}`,
  };

  const layout: ILayout = {
    pageLayout: "imageAndColumn",
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
