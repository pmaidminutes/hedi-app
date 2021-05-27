import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/page/types";
import { ITemplatePage } from "@/modules/template/types";
export const getTemplate = async (
  content: IPage
): Promise<ITemplatePage & IPageConfig> => {
  content.type = "Template";

  const layout: ILayout = {
    customKey: "template",
    rightColumnProps: { md: 4, lg: 6, xlg: 6 },
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
