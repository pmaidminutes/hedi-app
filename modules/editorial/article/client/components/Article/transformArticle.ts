import { buildAssetUrl } from "@/modules/common/utils";
import { IArticle } from "../../../types";

export interface IArticleProps {
  content: IArticle;
}
export function transformArticle(props: IArticleProps) {
  const { content } = props;
  const { label} = content;

  return {
    headline: label,

  };
}
