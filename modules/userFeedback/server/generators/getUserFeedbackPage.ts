import { segmentsToRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getUserFeedbackView } from "../../query";
import { IUserFeedbackView } from "../../types";

export const getUserFeedbackPage = async (
  segments?: string[],
  locale = "de"
): Promise<(IUserFeedbackView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getUserFeedbackView(
    segmentsToRoute(segments, locale),
    locale
  );
  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + locale,
  };
};
