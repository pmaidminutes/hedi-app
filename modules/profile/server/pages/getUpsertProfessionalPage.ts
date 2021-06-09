import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/page/types";

export const getUpsertProfilePage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
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
