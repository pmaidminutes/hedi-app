import { ISegmentPath } from "../../../types";
import { getArticlePaths } from "../../query";

export const getStaticPaths = async (
  locales: string[]
): Promise<ISegmentPath[]> => {
  const paths = [];
  for (let locale of locales) {
    const segments = await getArticlePaths(locale);
    if (segments) paths.push(...segments);
  }
  return paths;
};
