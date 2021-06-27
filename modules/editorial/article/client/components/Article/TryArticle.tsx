import { ITyped } from "@/modules/model";
import { IArticleView } from "../../../types";
import { Article } from "./Article";

export const TryArticle = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Article" ? (
    <Article content={content as IArticleView} />
  ) : null;
