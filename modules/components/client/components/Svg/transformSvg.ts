import { Svg } from "@/modules/model/components";

export interface ISvgProps extends Svg {}

export function transformSvg(props: ISvgProps) {
  const { route, labelText } = props;
  const src = process.env.NEXT_PUBLIC_ASSETS_URL + route;
// TODO render real svg from source
  return { src, alt: labelText };
}
