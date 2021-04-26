import { buildAssetUrl } from "@/modules/common/utils";
import { useState } from "react";
import { IArticle } from "../../../types";

export interface IArticleProps {
  content: IArticle;
}
export function useArticle(props: IArticleProps) {
  const { content } = props;
  const { label, body, audio, tags } = content;
  const [hasAudio, setHasAudio] = useState(audio);
  const [hasTags, setHasTags] = useState(tags.length > 0);

  const audioSrc = hasAudio ? buildAssetUrl(audio.route) : null;

  return {
    headline: label,
    body,
    audioSrc,
    tags,
    hasAudio,
    hasTags,
  };
}
