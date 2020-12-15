// TODO: remove after added new drupal field
import { getCategoryBySlug } from "./category";

export async function getCategoryColorClass(slug: string, locale: string) {
  const categoryData = await getCategoryBySlug(slug, locale);
  const catId = categoryData?.id ?? 0;
  let colorClass: string;
  switch (catId) {
    case 1:
      colorClass = "hedi-category-color--pregnancy";
      break;
    case 6:
      colorClass = "hedi-category-color--birth";
      break;
    case 7:
      colorClass = "hedi-category-color--after-birth";
      break;
    case 14:
      colorClass = "hedi-category-color--finances";
      break;
    case 13:
      colorClass = "hedi-category-color--advice";
      break;
    default:
      colorClass = "hedi-category-color--root";
  }
  return colorClass;
}
