import { IArticleEntry } from "../../../types";
export interface IArticleEntryList {
  articles: IArticleEntry[];
  type?: "oneColumn" | "twoColumns";
}

export function transformArticleEntryList(props: IArticleEntryList) {
  const { articles, type } = props;

  return { articles, type: type || "oneColumn" };
}
