import { CategoryRoot } from "../../../query";
export interface ICategoryRootProps {
  content: CategoryRoot;
}

export function transformCategoryRoot(props: ICategoryRootProps) {
  const { categories, articles } = props.content;

  return { categories, articles };
}
