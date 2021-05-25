import {
  ILayout,
} from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "../../types";

export interface ITest extends IPage {}

export const getTestPage = async (
  content: IPage
): Promise<ITest & IPageConfig> => {
  content.type = "Test";

  const layout: ILayout = {
    leftColumnProps: { sm: 4, md: 8, lg: 8 },
  };
  const shell: IPageConfig = {
    useHeader: true,
    layout,
  };
  return {
    ...content,
    ...shell,
  };
};
