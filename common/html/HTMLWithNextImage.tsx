import Image from "next/image";
import {
  HTML,
  ITransformCallbackMap,
  ParseInfoTransformFn,
  defaultTransform,
} from ".";

export const HTMLWithNextImage = ({
  data,
  locale,
  callbacks,
}: {
  data: string;
  locale?: string | null;
  callbacks?: ITransformCallbackMap;
}) => {
  const img: ParseInfoTransformFn = (_, __, props) => {
    if (props) {
      let { src, width, height, layout, ...rest } = props as any;

      width = width ? Number.parseInt(width) : width;
      height = height ? Number.parseInt(height) : height;

      return Image({ src, width, height, layout, ...rest });
    }
    return null;
  };

  const a: ParseInfoTransformFn = (htmlString, info, props: any) => {
    console.log({ props }, { info });
    if (locale && props?.className === "hedi-link-glossary") {
      props.href = `/${locale}${props.href}`;
    }
    return defaultTransform(htmlString, info, props);
  };

  return <HTML data={data} callbacks={{ ...callbacks, img, a }} />;
};
