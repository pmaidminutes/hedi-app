import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getUserFeedbackView } from "../../query";
import { IUserFeedbackView } from "../../types";

export const getUserFeedbackPage = async (
  route: string
): Promise<(IUserFeedbackView & IPageConfig) | null> => {
  const content = await getUserFeedbackView(route);
  if (!content) return null;

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
    ...shell,
  };
};
