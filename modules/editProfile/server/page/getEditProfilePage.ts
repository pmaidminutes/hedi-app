import { IAppPage } from "@/modules/common/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getEditProfileDefinition } from "../query";

export const getEditProfilePage = async (
  content: IAppPage
): Promise<IAppPage & IPageConfig> => {
  content.type = "EditProfile";

  const definition = await getEditProfileDefinition(content);

  const layout: ILayout = {
    pageLayout: "singleColumn",
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
