import { findLabelInstance } from "@/modules/components";
import { ICategory } from "../../../types";

export interface ICategoryProps {
  content: ICategory;
}

export function transformCategory(props: ICategoryProps) {
  const { content } = props;
  const { categories, articles, label, image, appStyle, components } = content;
  const articleEntryListHeadline = findLabelInstance(components, "allArticles");

  return {
    categories: categories?.length > 0 ? categories : null,
    articles: articles?.length > 0 ? articles : null,
    headline: label,
    image,
    appStyle,
    articleEntryListHeadline: articleEntryListHeadline?.text,
  };
}
