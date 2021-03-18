import { segmentsToRoute } from "@/modules/common/utils";
import { getViewProfileData } from "../../query/getViewProfileData";
import { getViewProfileFields } from "../../query/getViewProfileFields";
import { IViewProfile } from "../../types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IViewProfile | null> => {
  console.log(segments, "segments");
  if (!segments) {
    return null;
  } else {
    const appPage = await getViewProfileFields(
      segmentsToRoute(segments, locale)
    );
    const profileView = await getViewProfileData(
      segmentsToRoute(segments, locale)
    );
    return { AppPage: appPage, Profile: profileView } as IViewProfile;
  }
};
