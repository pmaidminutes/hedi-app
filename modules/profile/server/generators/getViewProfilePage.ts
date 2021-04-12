import { segmentsToRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getViewProfileView } from "../../query";
import { IViewProfileView } from "../../types";

export const getViewProfilePage = async (
  segments?: string[],
  locale = "de"
): Promise<(IViewProfileView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getViewProfileView(segmentsToRoute(segments, locale));

  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
  };
};
