import { IAppPage } from "@/modules/common/types";
import { IPageConfig } from "@/modules/shell/types";
import { getAppPage } from "../../query";

export const getAppPagePage = async (
  route: string
): Promise<(IAppPage & IPageConfig) | null> => {
  const content = await getAppPage(route);

  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
  };
};
