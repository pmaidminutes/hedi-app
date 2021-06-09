import { ICategory } from "../../../types";

export interface ICategoryProps {
  content: ICategory;
}

export function transformCategory(props: ICategoryProps) {
  const { content } = props;
  const { categories, articles, label, image, appstyle } = content;

  return {
    categories: categories.length > 0 ? categories : null,
    articles: articles.length > 0 ? articles : null,
    headline: label,
    image,
    appstyle,
  };
}
