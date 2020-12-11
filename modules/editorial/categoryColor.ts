// TODO: remove after added new drupal field
import { getCategoryBySlug } from "./category";

export async function getCategoryColorClass(slug: string, locale: string) {
  const categoryData = await getCategoryBySlug(slug, locale);
  const catId = categoryData?.id ?? 0;
  let colorClass: string;
  switch (catId) {
    case 1:
      colorClass = "pregnancy";
      break;
    case 6:
      colorClass = "birth";
      break;
    case 7:
      colorClass = "after-birth";
      break;
    case 14:
      colorClass = "finances";
      break;
    case 13:
      colorClass = "advice";
      break;
    default:
      colorClass = "root";
  }
  console.log({ colorClass });
}
