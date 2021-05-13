import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IAppPage } from "@/modules/common/types";
import { IPageConfig } from "@/modules/shell/types";
import { getProfileList } from "../query";
import { Profile } from "../../types";

export type ProfileListView = IAppPage & { profiles: Profile[] } & IPageConfig;

export const getProfileListPage = async (
  content: IAppPage
): Promise<ProfileListView> => {
  content.type = "ProfileList";

  const profiles = await getProfileList(content.lang);

  const layout: ILayout = {
    pageLayout: "singleColumn",
    customKey: "profile-list",
  };

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    revalidate: 1,
    layout,
  };

  return {
    ...content,
    profiles,
    ...shell,
  };
};
