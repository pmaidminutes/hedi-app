import { PartialBy } from "@/modules/common/utils";
import { IImageComponent } from "../../../types";

export type IImageProps = PartialBy<IImageComponent, "kind" | "usage">;

export function transformImage(props: IImageProps) {
  const { kind, usage, label, route, ...rest } = props;
  return {
    src: process.env.NEXT_PUBLIC_ASSETS_URL + route,
    ...rest,
  };
}
