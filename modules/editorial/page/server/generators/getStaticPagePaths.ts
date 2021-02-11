import { ISegmentPath } from "../../../types";
import { getPagePaths } from "../../query";

export const getStaticPaths = async (
  locales: string[]
): Promise<ISegmentPath[]> => {
  const paths = [];
  for (let locale of locales) {
    const segments = await getPagePaths(locale);
    if (segments) paths.push(...segments);
  }
  return paths;
};
