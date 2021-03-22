import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import { getLandingPageView } from "@/modules/landingPage/query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IAppPage | null> => {
  return getLandingPageView(segmentsToRoute(segments || [], locale));
};
