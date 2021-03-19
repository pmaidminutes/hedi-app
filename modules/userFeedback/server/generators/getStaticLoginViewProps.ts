import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import { getUserFeedbackThanksView } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IAppPage | null> => {
  if (!segments) {
    return null;
  } else {
    return getUserFeedbackThanksView(segmentsToRoute(segments, locale));
  }
};
