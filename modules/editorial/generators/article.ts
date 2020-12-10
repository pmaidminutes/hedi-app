// Modules
import { getArticlePaths, getArticleBySlug } from "@/modules/editorial/article";

export const getStaticPaths = async (locales: string[]) => {
  const paths = [];
  for (let locale of locales) {
    const segments = await getArticlePaths(locale);
    paths.push(...segments);
  }
  return paths;
};

export const getStaticProps = async (segments?: string[], locale = "de") => {
  if (!segments) {
    return null;
  } else {
    return getArticleBySlug(segments[segments.length - 1], locale);
  }
};
