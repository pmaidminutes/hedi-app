import { ICategoryProps } from "../Category/transformCategory";

export function transformCategoryRoot(props: ICategoryProps) {
  const { categories } = props.content;

  return { categories };
}
