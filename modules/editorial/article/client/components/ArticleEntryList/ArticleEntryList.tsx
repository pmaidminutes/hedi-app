import React from "react";
import { Row, Column } from "carbon-components-react";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import {
  transformArticleEntryList,
  IArticleEntryList,
} from "./transformArticleEntryList";

export const ArticleEntryList = (props: IArticleEntryList) => {
  const { articles, type, headline } = transformArticleEntryList(props);
  if (type === "oneColumn") {
    return (
      <div className="hedi--article-entry-list hedi--article-entry-list__one-column">
        <Row>
          <Column>
            <h3>{headline}</h3>
          </Column>
        </Row>
        {articles.map(article => (
          <Row>
            <Column sm={4} md={4} lg={8} key={article.route}>
              <ArticleEntry article={article} />
            </Column>
          </Row>
        ))}
      </div>
    );
  }
  return (
    <div className="hedi--article-entry-list hedi--article-entry-list__one-column">
      <Row>
        {articles?.map(article => (
          <Column sm={4} md={4} lg={8} key={article.route}>
            <ArticleEntry withGraphicalBreadcrumb={true} article={article} />
          </Column>
        ))}
      </Row>
    </div>
  );
};
