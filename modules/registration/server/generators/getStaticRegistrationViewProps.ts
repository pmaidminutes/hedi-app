import { segmentsToRoute } from "@/modules/common/utils";
import { IPageConfig } from "@/modules/shell/types";
import { getRegistrationView } from "../../query";
import { IRegistrationView } from "../../types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<(IRegistrationView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getRegistrationView(segmentsToRoute(segments, locale));

  if (!content) return null;

  return {
    ...content,
    useHeader: "AUTHORIZED",
  };
};
