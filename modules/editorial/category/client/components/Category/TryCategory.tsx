import { ITyped } from "@/modules/model";
import { ICategory } from "../../../types";
import { Category } from "./Category";

export const TryCategory = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Category" || content.type === "CategoryRoot" ? (
    <Category content={content as ICategory} />
  ) : null;
