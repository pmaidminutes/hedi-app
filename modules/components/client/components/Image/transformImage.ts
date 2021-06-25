import { PartialBy } from "@/modules/common/utils";
import { ImageProps } from "next/image";
import { IImageComponent } from "../../../types";

export type IImageProps = PartialBy<IImageComponent, "kind" | "usage"> &
  Omit<ImageProps, "src">;

export function transformImage(props: IImageProps) {
  const {
    kind,
    usage,
    label,
    route,
    layout,
    width,
    height,
    alt,
    className,
    sizes,
    quality,
    priority,
    placeholder,
    objectFit,
    objectPosition,
    loading,
    blurDataURL,
    unoptimized,

    ...rest
  } = props;

  const imageProps = {
    alt,
    className,
    src: process.env.NEXT_PUBLIC_ASSETS_URL + route,
    sizes,
    quality,
    priority,
    objectFit,
    objectPosition,
    loading,
    unoptimized,
  };

  // TODO: check why placeholder does not work

  switch (layout) {
    case "fill":
      return {
        layout,
        ...imageProps,
      };
    default:
      return {
        layout,
        width,
        height,
        ...imageProps,
      };
  }
}
