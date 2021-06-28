import {
  findBodyInstance,
  findLabelInstance,
  findTextInputInstance,
} from "@/modules/components";
import { ICategoryRoot } from "../../../types";

export function transformCategoryRoot(props: ICategoryRoot) {
  const { categories, articles, components, recommendedArticles } = props;

  const headline = findLabelInstance(components, "headline");
  const text = findBodyInstance(components, "introText");
  const articleEntryListHeadline = findLabelInstance(components, "allArticles");
  const searchInput = findTextInputInstance(components, "search");
  const recommendedArticlesHeadline = findLabelInstance(
    components,
    "headlineRecommendedArticles"
  );

  return {
    categories,
    articles,
    headline,
    text,
    allArticlesHeadline: articleEntryListHeadline?.text,
    searchPlaceholder: searchInput?.placeholder,
    recommendedArticles,
    recommendedArticlesHeadline:
      recommendedArticlesHeadline?.text || "Topics to start with",
  };
}
