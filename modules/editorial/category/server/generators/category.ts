// Modules
import { segmentsToRoute } from "@/common/types";
import { ICategoryRoot } from "../../types";
import { getCategory, getCategoryPaths, getCategoryRoot } from "../../query";
// TODO return type
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

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<ICategoryRoot | null> => {
  if (!segments) {
    return getCategoryRoot(locale);
  } else {
    return getCategory(segmentsToRoute(segments), locale);
  }
};
