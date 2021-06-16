import { ICategoryRoot } from "../../../types";

export function transformCategoryRoot(props: ICategoryRoot) {
  const { categories, articles } = props;

  return { categories, articles };
}
