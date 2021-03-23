import { segmentsToRoute } from "@/modules/common/utils";
import { getProfile, ProfileView } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<ProfileView | null> => {
  if (!segments) {
    return null;
  } else {
    return getProfile(segmentsToRoute(segments, locale));
  }
};
