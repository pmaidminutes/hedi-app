import { segmentsToRoute } from "@/modules/common/utils";
import { getInstitution } from "../../query";
import { IInstitution } from "../../types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IInstitution | null> => {
  if (!segments) {
    return null;
  } else {
    return getInstitution(segmentsToRoute(segments), locale);
  }
};
