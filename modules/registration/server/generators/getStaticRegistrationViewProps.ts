import { segmentsToRoute } from "@/modules/common/utils";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getRegistrationView } from "../../query";
import { IRegistrationView } from "../../types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<(IRegistrationView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getRegistrationView(segmentsToRoute(segments, locale));

  if (!content) return null;

  const layoutImg = {
    alt: "Beschreibung",
    src: `${process.env.NEXT_PUBLIC_IMG_HEADER}`,
  };
  
  const layout: ILayout = {
    pageLayout: "imageAndColumn",
    layoutImg,
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
