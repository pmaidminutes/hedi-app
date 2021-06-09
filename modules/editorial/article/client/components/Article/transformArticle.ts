import { buildAssetUrl } from "@/modules/common/utils";
import { findAllHeadlineInstances, findHeadlineInstance } from "@/modules/components/types";
import { IArticle } from "../../../types";

export interface IArticleProps {
  content: IArticle;
}
export function transformArticle(props: IArticleProps) {
  const { content } = props;
  const { label, components, category, appstyle } = content;

  const headlines = findAllHeadlineInstances(components);

  return {
    headline: label,
    components,
    headlines
  };
}
