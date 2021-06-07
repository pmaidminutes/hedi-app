import { IAppPage } from "@/modules/common/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getFeedbackThanksDefinition } from "../query";
import { IFeedbackThanksView } from "../../types/IFeedbackThanksView";

export const getFeedbackThanksPage = async (
  content: IAppPage
): Promise<IFeedbackThanksView & IPageConfig> => {
  content.type = "FeedbackThanks";

  const definition = await getFeedbackThanksDefinition(content);

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
  };

  return {
    ...content,
    ...definition,
    ...shell,
  };
};
