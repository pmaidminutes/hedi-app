import { buildAssetUrl } from "@/modules/common/utils";
import { ICategoryEntry } from "../../../types";

export interface ICategoryEntryProps {
  category: ICategoryEntry;
}
export function transformCategoryEntry({ category }: ICategoryEntryProps) {
  const { image, label, route } = category;

  const imageSrc = image ? buildAssetUrl(image.route) : "";


  return{route, image: image ?? null, label, imageSrc}
}