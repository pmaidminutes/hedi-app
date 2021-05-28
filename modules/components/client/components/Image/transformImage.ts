import { Image } from "@/modules/model/components";

export interface IImageProps extends Image {}

export function transformImage(props: IImageProps) {
  const { labelText,route, ...rest } = props;
  return {
    src: process.env.NEXT_PUBLIC_ASSETS_URL + route,
    ...rest,
  };
}