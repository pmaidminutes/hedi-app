import { segmentsToRoute } from "@/common/types";
import { ICategoryRoot } from "../../types";
import { getCategory, getCategoryRoot } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<ICategoryRoot | null> => {
  if (!segments) {
    return getCategoryRoot(locale);
  } else {
    return getCategory(segmentsToRoute(segments), locale);
  }
};
