import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/page/types";

export const getFeedbackThanksPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "FeedbackThanks";

  const layout: ILayout = {
    rightColumnProps: { md: 4, lg: 6, xlg: 6 },
  };
  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
