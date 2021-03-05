import { ISegmentPath } from "@/modules/common/types";
import { getSearchViewPath } from "../../query";

export const getStaticPaths = async (
  locales: string[]
): Promise<ISegmentPath[]> => {
  const paths = [];
  if (locales) {
    for (let locale of locales) {
      const searchViewPaths = await getSearchViewPath(locale);
      paths.push(...searchViewPaths);
    }
  }
  return paths;
};
