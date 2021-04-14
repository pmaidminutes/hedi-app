import { segmentsToRoute } from "@/modules/common/utils";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getUserFeedbackView } from "../../query";
import { IUserFeedbackView } from "../../types";

export const getUserFeedbackPage = async (
  segments?: string[],
  locale = "de"
): Promise<(IUserFeedbackView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getUserFeedbackView(segmentsToRoute(segments, locale));
  if (!content) return null;

  const layout: ILayout = {
    pageLayout: "singleColumn",
  };
  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + locale,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
