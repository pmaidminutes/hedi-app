import { segmentsToRoute } from "@/modules/common/utils";
import { IMidwife } from "../../types";
import { getMidwife } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IMidwife | null> => {
  if (!segments) {
    return null;
  } else {
    return getMidwife(segmentsToRoute(segments, locale), locale);
  }
};
