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

  const layout: ILayout = {
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
