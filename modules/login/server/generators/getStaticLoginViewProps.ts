import { segmentsToRoute } from "@/modules/common/utils";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getLoginView } from "../../client/request";
import { ILoginView } from "../../types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<(ILoginView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getLoginView(segmentsToRoute(segments, locale));

  if (!content) return null;

  const layoutImg = {
    alt: "Beschreibung des Bildes",
    src: `${process.env.NEXT_PUBLIC_IMG_HEADER}`,
  };
  const layout: ILayout = {
    layoutImg,
    customKey: "login-form",
    rightColumnProps: { md: 4, lg: 6, xlg: 6 },
    pageLayout: "imageAndColumn",
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
