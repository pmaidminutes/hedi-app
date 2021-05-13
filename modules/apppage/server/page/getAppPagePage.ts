import { IAppPage } from "@/modules/common/types";
import { IPageConfig } from "@/modules/shell/types";

export const getAppPagePage = async (
  content: IAppPage
): Promise<IAppPage & IPageConfig> => {
  // serves as default page render
  // so place to set senseful config and security values;

  return {
    ...content,
    useHeader: "AUTHORIZED",
  };
};
