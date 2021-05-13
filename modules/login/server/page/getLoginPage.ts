import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getLoginDefinition } from "../query";
import { ILoginView } from "../../types";
import { IAppPage } from "@/modules/common/types";

export const getLoginPage = async (
  content: IAppPage
): Promise<ILoginView & IPageConfig> => {
  content.type = "Login";

  const definition = await getLoginDefinition(content);

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
    ...definition,
    ...shell,
  };
};
