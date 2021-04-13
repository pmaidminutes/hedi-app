import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getSearchView } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<(IAppPage & IPageConfig) | null> => {
  if (!segments) return null;
  const content = await getSearchView(segmentsToRoute([segments[0]], locale));
  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
  };
};
