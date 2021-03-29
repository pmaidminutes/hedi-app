import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import { getLandingPageView } from "@/modules/landingPage/query";
import { IPageConfig } from "@/modules/shell/types";
import { landingPagePaths } from "../../types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<(IAppPage & IPageConfig) | null> => {
  if (
    !landingPagePaths.find(
      path =>
        segmentsToRoute(segments || [], locale) ==
        segmentsToRoute(path.params?.segments || [], path.locale)
    )
  )
    return null;

  const content = await getLandingPageView(
    segmentsToRoute(segments || [], locale),
    locale
  );

  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
  };
};
