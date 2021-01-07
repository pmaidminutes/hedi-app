// Modules
import { segmentsToRoute } from "@/common/types";
import { IArticle } from "@/modules/editorial/article/types";
import { getArticlePaths, getArticle } from "@/modules/editorial/article/query";

// TODO return type
export const getStaticPaths = async (locales: string[]) => {
  const paths = [];
  for (let locale of locales) {
    const segments = await getArticlePaths(locale);
    if (segments) paths.push(...segments);
  }
  return paths;
};

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<IArticle | null> => {
  if (!segments) {
    return null;
  } else {
    return getArticle(segmentsToRoute(segments), locale);
  }
};
