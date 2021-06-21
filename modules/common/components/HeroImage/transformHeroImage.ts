import { IImageComponent } from "@/modules/components";

export function transformHeroImage(image: IImageComponent) {
  let containerClass = "hedi--hero-image";

  const { alt, width, height, color } = image;

  const src = image ? process.env.NEXT_PUBLIC_ASSETS_URL + image.route : "";

  return { color: color || "transparent", image: { src, alt } };
}
