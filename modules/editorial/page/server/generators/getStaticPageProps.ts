import { segmentsToRoute } from "@/modules/common/utils";
import { IPage } from "../../types";
import { getPage } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IPage | null> => {
  if (!segments) {
    return null;
  } else {
    return getPage(segmentsToRoute(segments, locale), locale);
  }
};
