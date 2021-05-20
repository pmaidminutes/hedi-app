import Image from "next/image";
import { HTML } from "./HTML";
import { HTMLProps, ParseInfoTransformFn } from "./types";

export const HTMLWithNextImage = ({ data, callbacks }: HTMLProps) => {
  const img: ParseInfoTransformFn = (_, __, props) => {
    if (props) {
      let { src, width, height, layout, ...rest } = props as any;

      width = width ? Number.parseInt(width) : width;
      height = height ? Number.parseInt(height) : height;

      return Image({ src, width, height, layout, ...rest });
    }
    return null;
  };

  return <HTML data={data} callbacks={{ ...callbacks, img }} />;
};
