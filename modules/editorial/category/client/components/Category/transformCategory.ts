import { ICategory } from "../../../types";

export interface ICategoryProps {
  content: ICategory;
}

export function transformCategory(props: ICategoryProps) {
  const { content } = props;
  const { categories, articles } = content;

  return {
    categories: categories.length > 0 ? categories : null,
    articles: articles.length > 0 ? articles : null,
  };
}
