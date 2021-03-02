import { segmentsToRoute } from "@/modules/common/utils";
import { IUIText } from "@/modules/model";
import { getSearchView } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IUIText | null> => {
  if (!segments) {
    return null;
  } else {
    return getSearchView(segmentsToRoute([segments[0]], locale), locale);
  }
};
