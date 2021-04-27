import { IAppPage } from "@/modules/common/types";
import { getLangByRoute } from "@/modules/common/utils";
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

  const locale = getLangByRoute(route);

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + locale,
    layout,
  };
  return {
    ...content,
    ...shell,
  };
};
