import { ISegmentPath } from "@/common/types";
import { getCategoryPaths } from "../../query";

export const getStaticPaths = async (
  locales: string[]
): Promise<ISegmentPath[]> => {
  const paths = [];
  for (let locale of locales) {
    paths.push({
      params: { segments: undefined }, //no subsegment = root category
      locale,
    });
    const segments = await getCategoryPaths(locale);
    if (segments) paths.push(...segments);
  }

  return paths;
};
