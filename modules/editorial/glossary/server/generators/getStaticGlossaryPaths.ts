import { ISegmentPath } from "@/modules/common/types";
import { getGlossaryPath } from "../../query";

export const getStaticPaths = async (
  locales: string[]
): Promise<ISegmentPath[]> => {
  const paths = [];
  if (locales) {
    for (let locale of locales) {
      const glossaryPaths = await getGlossaryPath(locale);
      paths.push(...glossaryPaths);
    }
  }
  return paths;
};
