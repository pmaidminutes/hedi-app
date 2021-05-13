import { IAppPage } from "@/modules/common/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getViewProfileDefinition } from "../query";
import { IViewProfileView } from "../../types";

export const getViewProfilePage = async (
  content: IAppPage
): Promise<IViewProfileView & IPageConfig> => {
  content.type = "ViewProfile";

  const definition = await getViewProfileDefinition(content);

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
    ...definition,
    ...shell,
  };
};
