import { IImageComponent } from "@/modules/components";
export interface IHeroImage {
  image: IImageComponent;
  color?: string;
}
export function transformHeroImage(props: IHeroImage) {
  const { image, color } = props;

  let containerClass = "hedi--hero-image";

  const { alt, width, height } = image;

  const src = image ? process.env.NEXT_PUBLIC_ASSETS_URL + image.route : "";

  return { containerClass, image: { src, alt, width, height } };
}
