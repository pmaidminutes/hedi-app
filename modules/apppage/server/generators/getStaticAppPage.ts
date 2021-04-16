import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getAppPage } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<(IAppPage & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getAppPage(segmentsToRoute(segments, locale));

  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
  };
};
