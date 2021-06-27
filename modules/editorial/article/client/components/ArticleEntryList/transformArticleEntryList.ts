import head from "next/head";
import { IArticleEntry } from "../../../types";
export interface IArticleEntryList {
  articles: IArticleEntry[];
  type?: "oneColumn" | "twoColumns";
  headline?: string;
}

export function transformArticleEntryList(props: IArticleEntryList) {
  const { articles, type, headline } = props;

  return {
    articles,
    type: type || "oneColumn",
    headline: headline || "All Articles",
  };
}
