// Modules
import {
  getCategoryBySlug,
  getCategoryPaths,
  getRootCategories,
} from "@/modules/editorial/category";

export const getStaticPaths = async (locales: string[]) => {
  const paths = [];
  for (let locale of locales) {
    paths.push({
      params: { segments: undefined }, //no subsegment = root category
      locale,
    });
    const segments = await getCategoryPaths(locale);
    paths.push(...segments);
  }

  return paths;
};

export const getStaticProps = async (
  segments?: string[],
  locale = "de",
  locales: string[] = []
) => {
  if (!segments) {
    return getRootCategories(locale, locales);
  } else {
    return getCategoryBySlug(segments[segments.length - 1], locale);
  }
};
