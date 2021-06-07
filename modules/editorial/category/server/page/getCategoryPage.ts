import { ICategory } from "../../types";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";

export const getCategoryPage = async (
  content: ICategory
): Promise<ICategory & IPageConfig> => {
  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
  };

  return {
    ...content,
    ...shell,
  };
};
