import { ISegmentPath } from "@/modules/common/types";
import { getOrganisationPaths } from "../../query";

export const getStaticPaths = async (
  locales: string[]
): Promise<ISegmentPath[]> => {
  const paths = [];
  for (let locale of locales) {
    const segments = await getOrganisationPaths(locale);
    if (segments) paths.push(...segments);
  }
  return paths;
};
