import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import { getEditProfile } from "../../query";

// UNUSED
export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IAppPage | null> => {
  if (!segments) {
    return null;
  } else {
    return getEditProfile(segmentsToRoute(segments, locale));
  }
};
