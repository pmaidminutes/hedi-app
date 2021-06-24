import React from "react";
import { IArticleTeaser } from "../../../types";
import { ArticleTeaserEntry } from "../ArticleTeaserEntry";
export interface IArticleTeaserProps {
  articles: IArticleTeaser[];
  headline: string;
}
export const ArticleTeaser = (props: IArticleTeaserProps) => {
  const { articles, headline } = props;
  return (
    <div>
      <h2>{headline}</h2>
      {articles.map((article, index) => (
        <ArticleTeaserEntry key={article.label + index} {...article} />
      ))}
    </div>
  );
};
