import { getCategory } from "./getCategory";

// TODO: remove after added new drupal field
export async function getCategoryColorClass(
  segment: string,
  lang: string
): Promise<string> {
  let key = segment;
  if (lang !== "en") {
    const categoryData = await getCategory("/" + segment, lang);
    const route =
      categoryData?.translations.find(c => c.lang === "en")?.route ?? "/root";
    key = route.substr(1);
  }
  return "hedi-category-color--" + key;
}
