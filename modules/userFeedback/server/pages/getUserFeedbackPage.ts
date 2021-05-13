import { IAppPage } from "@/modules/common/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getUserFeedbackDefinition } from "../query";
import { IUserFeedbackView } from "../../types";

export const getUserFeedbackPage = async (
  content: IAppPage
): Promise<IUserFeedbackView & IPageConfig> => {
  content.type = "UserFeedback";

  const definition = await getUserFeedbackDefinition(content);

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
