import { IAppPage } from "@/modules/common/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getFeedbackDefinition } from "../query";
import { IFeedbackView } from "../../types";
import { IPage } from "@/modules/page/types";

export const getFeedbackPage = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  content.type = "Feedback";

  // const definition = await getFeedbackDefinition(content);

  const layout: ILayout = {
    pageLayout: "singleColumn",
    customKey: "feedback-form",
    rightColumnProps: { md: 4, lg: 6, xlg: 6 },
  };
  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    layout,
  };

  return {
    ...content,
    // ...definition,
    ...shell,
  };
};
