import {
  findBodyInstance,
  findLabelInstance,
  findTextInputInstance,
} from "@/modules/components";
import { ICategoryRoot } from "../../../types";

export function transformCategoryRoot(props: ICategoryRoot) {
  const { categories, articles, components } = props;

  const headline = findLabelInstance(components, "headline");
  const text = findBodyInstance(components, "introText");
  const articleEntryListHeadline = findLabelInstance(components, "allArticles");
  const searchInput = findTextInputInstance(components, "search");

  return {
    categories,
    articles,
    headline,
    text,
    allArticlesHeadline: articleEntryListHeadline?.text,
    searchPlaceholder: searchInput?.placeholder,
  };
}
