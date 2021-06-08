import { IArticleEntry } from "../../../types";

export interface IArticleEntryProps {
  article: IArticleEntry;
}
export function transformArticleEntry({ article }: IArticleEntryProps) {
  const { label, route } = article;

  return { label, route };
}
