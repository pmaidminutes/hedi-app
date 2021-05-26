import { Audio } from "@/modules/model/components";

export function transformAudio(props: Audio) {
  const { route, mimeType, labelText } = props;

  return {
    src: process.env.NEXT_PUBLIC_ASSETS_URL + route,
    mimeType,
    labelText,
  };
}
