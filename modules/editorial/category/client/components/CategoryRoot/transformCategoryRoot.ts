import { findBodyInstance, findLabelInstance } from "@/modules/components";
import { ICategoryRoot } from "../../../types";

export function transformCategoryRoot(props: ICategoryRoot) {
  const { categories, articles, components, recommendedArticles } = props;

  const headline = findLabelInstance(components, "headline");
  const text = findBodyInstance(components, "introText");

  return { categories, articles, headline, text, recommendedArticles };
}
