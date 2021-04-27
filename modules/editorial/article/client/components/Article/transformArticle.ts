import { buildAssetUrl } from "@/modules/common/utils";
import { IArticle } from "../../../types";

export interface IArticleProps {
  content: IArticle;
}
export function transformArticle(props: IArticleProps) {
  const { content } = props;
  const { label, body, audio, tags } = content;
  const hasAudio = tags.length > 0;

  const audioSrc = hasAudio ? buildAssetUrl(audio.route) : null;

  return {
    headline: label,
    body,
    audioSrc,
    tags: tags.length > 0 ? tags : null,
    hasAudio,
  };
}
