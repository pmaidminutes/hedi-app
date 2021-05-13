import { getProfileDefinition } from "../query/getProfileDefinition";
import { Profile, ProfileView } from "../../types";
import { IPageConfig } from "@/modules/shell/types";

export const getProfilePage = async (
  content: Profile
): Promise<ProfileView> => {
  const definition = await getProfileDefinition(content.lang);

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
