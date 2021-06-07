import { IPageConfig } from "@/modules/shell/types";
import { getProfileList } from "../query";
import { IPage } from "@/modules/page/types";
import { ProfileListView } from "../../client/components";

export const getProfileListPage = async (
  content: IPage
): Promise<ProfileListView & IPageConfig> => {
  content.type = "ProfileList";

  const profileEntries = await getProfileList(content.lang);

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    revalidate: 1,
  };

  return {
    ...content,
    profileEntries,
    ...shell,
  };
};
