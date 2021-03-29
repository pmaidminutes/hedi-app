import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getUserFeedbackThanksView } from "../../query";

export const getUserFeedbackThanksPage = async (
  segments?: string[],
  locale = "de"
): Promise<(IAppPage & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getUserFeedbackThanksView(
    segmentsToRoute(segments, locale)
  );
  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + locale,
  };
};