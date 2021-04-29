import { IArticleEntry } from "../../../types";

export interface IArticleEntryProps {
  article: IArticleEntry;
}
export function transformArticleEntry({ article }: IArticleEntryProps) {
  const { label, summary, route } = article;


  return {label, summary, route}
 }