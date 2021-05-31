import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getProfileList } from "../query";
import { IProfileEntry } from "../../types";
import { IPage } from "@/modules/page/types";

export type ProfileListView = IPage & {
  profileEntries: IProfileEntry[];
} & IPageConfig;

export const getProfileListPage = async (
  content: IPage
): Promise<ProfileListView> => {
  content.type = "ProfileList";

  const profileEntries = await getProfileList(content.lang);

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
    profileEntries,
    ...shell,
  };
};
