// Modules
import { getAllEditorialSegments } from "@/modules/editorial/editorial";
import {
  getCategoryBySlug,
  getRootCategories,
} from "@/modules/editorial/categories";
import { getArticleBySlug } from "@/modules/editorial/article";
// Helper
import { stringToSlug } from "@/modules/editorial/helper";

export const getStaticPaths = async (locales: string[]) => {
  const paths = [];
  if (locales) {
    for (let locale of locales) {
      paths.push({
        params: { segments: undefined }, //no subsegment = root category
        locale,
      });
      const segments = await getAllEditorialSegments(locale);
      paths.push(...segments);
    }
  }
  return paths;
};

export const getStaticProps = async (
  segments?: string[],
  locale = "de",
  locales: string[] = []
) => {
  let content;

  if (!segments) {
    content = await getRootCategories(locale, locales);
  } else {
    const slug = stringToSlug(segments[segments.length - 1]);
    content = await getCategoryBySlug(slug, locale);
    if (!content) content = await getArticleBySlug(slug, locale);
  }
  return content;
};
