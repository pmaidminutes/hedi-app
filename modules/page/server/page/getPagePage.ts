import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "../../types";

export const getPagePage = async (
  content: IPage
): Promise<(IPage & IPageConfig)> => {


  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
  };
  return {
    ...content,
    ...shell,
  };
};
