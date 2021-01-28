import { ISegmentPath } from "@/modules/editorial/types";
import { getMidwifePaths } from "../../query";

export const getStaticPaths = async (
  locales: string[]
): Promise<ISegmentPath[]> => {
  const paths: ISegmentPath[] = [];
  for (let locale of locales) {
    const segments = await getMidwifePaths(locale);
    if (segments) paths.push(...segments);
  }
  return paths;
};
