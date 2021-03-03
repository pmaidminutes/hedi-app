import { segmentsToRoute } from "@/modules/common/utils";
import { getOrganisation } from "../../query";
import { IOrganisation } from "../../types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IOrganisation | null> => {
  if (!segments) {
    return null;
  } else {
    return getOrganisation(segmentsToRoute(segments, locale));
  }
};
