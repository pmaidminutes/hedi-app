import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/page/types";

export const getProfileEditPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "ProfileEdit";
  // TODO probably need to pull services for pageDefinition

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
  };

  return {
    ...content,
    ...shell,
  };
};
