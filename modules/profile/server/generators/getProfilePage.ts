import { segmentsToRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getProfile, ProfileView } from "../../query";

export const getProfilePage = async (
  segments?: string[],
  locale = "de"
): Promise<(ProfileView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getProfile(segmentsToRoute(segments, locale));

  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    revalidate: 1,
  };
};
