import { segmentsToRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getProfileList, ProfileListView } from "../../query";

export const getProfileListPage = async (
  segments?: string[],
  locale = "de"
): Promise<(ProfileListView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getProfileList(segmentsToRoute(segments, locale));
  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
    revalidate: 1,
  };
};
