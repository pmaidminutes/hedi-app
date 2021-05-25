import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/page/types";
import { ILoginNew } from "@/modules/login/client";
export const getLoginPage = async (
  content: IPage
): Promise<ILoginNew & IPageConfig> => {
  content.type = "LoginNew";

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
    useHeader: true,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
