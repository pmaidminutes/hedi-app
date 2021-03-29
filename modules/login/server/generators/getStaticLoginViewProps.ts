import { segmentsToRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getLoginView } from "../../query";
import { ILoginView } from "../../types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<(ILoginView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getLoginView(segmentsToRoute(segments, locale));

  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
  };
};
