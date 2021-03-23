import { segmentsToRoute } from "@/modules/common/utils";
import { getProfileList, ProfileListView } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<ProfileListView | null> => {
  if (!segments) {
    return null;
  } else {
    return getProfileList(segmentsToRoute(segments, locale));
  }
};
