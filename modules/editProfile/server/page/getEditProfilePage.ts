import { IAppPage } from "@/modules/common/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getEditProfile } from "../../query";

export const getEditProfilePage = async (
  route: string
): Promise<(IAppPage & IPageConfig) | null> => {
  const content = await getEditProfile(route);
  if (!content) return null;

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
    ...shell,
  };
};
