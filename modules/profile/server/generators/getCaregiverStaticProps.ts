import { segmentsToRoute } from "@/modules/common/utils";
import { ICaregiver } from "../../types";
import { getCaregiver } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<ICaregiver | null> => {
  if (!segments) {
    return null;
  } else {
    return getCaregiver(segmentsToRoute(segments, locale));
  }
};
