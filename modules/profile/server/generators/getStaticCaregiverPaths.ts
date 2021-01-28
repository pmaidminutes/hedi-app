import { ISegmentPath } from "@/modules/editorial/types";
import { getCaregiverPaths } from "../../query";

export const getStaticPaths = async (
  locales: string[]
): Promise<ISegmentPath[]> => {
  const paths = [];
  for (let locale of locales) {
    const segments = await getCaregiverPaths(locale);
    if (segments) paths.push(...segments);
  }
  return paths;
};
