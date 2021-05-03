import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IAppPage } from "@/modules/common/types";
import { getLangByRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getProfileList, getProfileListDefinition } from "../../query";
import { Profile } from "../../types";

export type ProfileListView = IAppPage & { profiles: Profile[] } & IPageConfig;

export const getProfileListPage = async (
  route: string
): Promise<ProfileListView | null> => {
  const definition = await getProfileListDefinition(route);
  const content = await getProfileList(getLangByRoute(route) ?? "de");
  if (!content || !definition) return null;

  const layout: ILayout = {
    pageLayout: "singleColumn",
    customKey: "profile-list",
  };

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + definition.lang,
    revalidate: 1,
    layout,
  };

  return {
    profiles: content,
    ...definition,
    ...content,
    ...shell,
  };
};
