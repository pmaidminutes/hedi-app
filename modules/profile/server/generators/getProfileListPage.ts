import { segmentsToRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getProfileListView, ProfileListView } from "../../query";

export const getProfileListPage = async (
  segments?: string[],
  locale = "de"
): Promise<(ProfileListView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getProfileListView(segmentsToRoute(segments, locale));
  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    revalidate: 1,
  };
};
