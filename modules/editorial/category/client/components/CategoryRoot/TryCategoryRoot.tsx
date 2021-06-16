import { ITyped } from "@/modules/model";
import { ICategoryRoot } from "../../../types";
import { CategoryRoot } from "./CategoryRoot";

export const TryCategoryRoot = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "CategoryRoot" ? (
    <CategoryRoot {...(content as ICategoryRoot)} />
  ) : null;
