import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getLoginView } from "../../client/request";
import { ILoginView } from "../../types";

export const getLoginViewPage = async (
  route: string
): Promise<(ILoginView & IPageConfig) | null> => {
  const content = await getLoginView(route);

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
