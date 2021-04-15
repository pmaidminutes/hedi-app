import { segmentsToRoute } from "@/modules/common/utils";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getViewProfileView } from "../../query";
import { IViewProfileView } from "../../types";

export const getViewProfilePage = async (
  segments?: string[],
  locale = "de"
): Promise<(IViewProfileView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getViewProfileView(segmentsToRoute(segments, locale));

  if (!content) return null;

  if (!content) return null;
  const layoutImg = {
    src: `${process.env.NEXT_PUBLIC_IMG_HEADER_PROFILE}`,
    alt: "Some description",
  };

  const layout: ILayout = {
    pageLayout: "imageAndColumn",
    layoutImg,
    rightColumnProps: { md: 4, lg: 6, xlg: 6 },
  };
  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
