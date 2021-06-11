import { IImageComponent } from "@/modules/components/types";
import { ICategoryEntry } from "../../../types";

export interface ICategoryEntryProps {
  category: ICategoryEntry;
}
export function transformCategoryEntry({ category }: ICategoryEntryProps) {
  const { image, label, route } = category;


  const transformedImage: IImageComponent = {
    alt: image?.alt || "",
    kind: "Image",
    route: image?.route || "/",
    labelText: image?.label || "missing",
    width: image?.width || 1024,
    height: image?.height || 768,
  };

  return { route, image: transformedImage ?? null, label };
}
