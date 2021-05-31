import { IProfile, ProfileView } from "../../types";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/page/types";

export const getProfilePage = async (
  content: IProfile
): Promise<ProfileView> => {
  const definition: IPage = ({} as unknown) as IPage;

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    revalidate: 1,
  };

  return {
    ...content,
    ...definition,
    ...shell,
  };
};
