import { IImageProps } from "@/modules/components";

export function transformHeroImage(image: IImageProps) {
  const { color, layout, objectFit, objectPosition } = image;

  return {
    color: color || "transparent",
    image,
    layout: layout || "fill",
    objectFit: objectFit || "cover",
    objectPosition: objectPosition || "center center",
  };
}
