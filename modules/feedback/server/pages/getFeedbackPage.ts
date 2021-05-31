import { IAppPage } from "@/modules/common/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getFeedbackDefinition } from "../query";
import { IFeedbackView } from "../../types";

export const getFeedbackPage = async (
  content: IAppPage
): Promise<IFeedbackView & IPageConfig> => {
  content.type = "Feedback";

  const definition = await getFeedbackDefinition(content);

  const layout: ILayout = {
    pageLayout: "singleColumn",
  };
  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    layout,
  };

  return {
    ...content,
    ...definition,
    ...shell,
  };
};
