import { ITyped } from "@/modules/model";
import { ICategory } from "../../../types";
import { CategoryRoot } from "./CategoryRoot";

export const TryCategoryRoot = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "CategoryRoot" ? (
    <CategoryRoot content={content as ICategory} />
  ) : null;
