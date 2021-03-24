import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import { getLandingPageView } from "@/modules/landingPage/query";
import { IPageConfig } from "@/modules/shell/types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<(IAppPage & IPageConfig) | null> => {
  const content = await getLandingPageView(
    segmentsToRoute(segments || [], locale),
    locale
  );
return content
  // if (!content) return null;
  // const pageConfig = { useHeader: false, useFooter: true };
  // return { ...content, ...pageConfig };
};
