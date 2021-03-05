import { ISegmentPath } from "@/modules/common/types";
import { getInstitutionPaths } from "../../query";

export const getStaticPaths = async (
  locales: string[]
): Promise<ISegmentPath[]> => {
  const paths = [];
  for (let locale of locales) {
    const segments = await getInstitutionPaths(locale);
    if (segments) paths.push(...segments);
  }
  return paths;
};
