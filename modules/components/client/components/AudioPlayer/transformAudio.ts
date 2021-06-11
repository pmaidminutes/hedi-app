import { IAudioComponent } from "../../../types";
import { HTML } from "@/modules/react/html/HTML";
import { PartialBy } from "@/modules/common/utils";

export function transformAudio(
  props: PartialBy<IAudioComponent, "kind" | "usage">
) {
  const { route, mimeType, labelText } = props;

  return {
    src: process.env.NEXT_PUBLIC_ASSETS_URL + route,
    mimeType,
    labelText: HTML({ data: labelText }),
  };
}
