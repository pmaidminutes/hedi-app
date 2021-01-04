// Modules
import { segmentsToRoute } from "@/common/types";
import {
  getCategory,
  getCategoryPaths,
  getCategoryRoot,
} from "@/modules/editorial/category";

export const getStaticPaths = async (locales: string[]) => {
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

export const getStaticProps = async (segments?: string[], locale = "de") => {
  if (!segments) {
    return getCategoryRoot(locale);
  } else {
    return getCategory(segmentsToRoute(segments), locale);
  }
};
