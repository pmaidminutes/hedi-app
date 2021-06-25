import React from "react";
import { Row, Column } from "carbon-components-react";
import { IArticleEntry } from "../../../types";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import { transformArticleEntryList } from "./transformArticleEntryList";

export interface IArticleEntryList {
  articles: IArticleEntry[];
  type?: "oneColumn" | "twoColumns";
}

export const ArticleEntryList = (props: IArticleEntryList) => {
  const { articles, type } = transformArticleEntryList(props);
  if (type === "oneColumn") {
    return (
      <>
        {articles.map(article => (
          <Row>
            <Column sm={4} md={4} lg={8} key={article.route}>
              <ArticleEntry article={article} />
            </Column>
          </Row>
        ))}
      </>
    );
  }
  return (
    <Row>
      {articles?.map(article => (
        <Column sm={4} md={4} lg={6} key={article.route}>
          <ArticleEntry withGraphicalBreadcrumb={true} article={article} />
        </Column>
      ))}
    </Row>
  );
};
