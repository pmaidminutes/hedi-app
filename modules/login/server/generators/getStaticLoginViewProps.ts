import { segmentsToRoute } from "@/modules/common/utils";
import { getLoginView } from "../../query";
import { ILoginView } from "../../types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<ILoginView | null> => {
  if (!segments) {
    return null;
  } else {
    return getLoginView(segmentsToRoute(segments, locale));
  }
};
