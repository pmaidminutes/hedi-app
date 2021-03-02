import { segmentsToRoute } from "@/modules/common/utils";
import { IArticle } from "../../types";
import { getArticle } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IArticle | null> => {
  if (!segments) {
    return null;
  } else {
    return getArticle(segmentsToRoute(segments, locale), locale);
  }
};
