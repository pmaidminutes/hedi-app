import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import { getRegistrationView } from "../../query";
import { IRegistrationView } from "../../types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IRegistrationView | null> => {
  if (!segments) {
    return null;
  } else {
    return getRegistrationView(segmentsToRoute(segments, locale));
  }
};
