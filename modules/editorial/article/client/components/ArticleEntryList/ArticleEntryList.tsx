import React from "react";
import { ArticleEntry } from "../ArticleEntry";
import { Row, Column } from "carbon-components-react";

import {
  IArticleEntryListProps,
  transformArticleEntryList,
} from "./transformArticleEntryList";

export const ArticleEntryList = (props: IArticleEntryListProps) => {
  const {
    articles,
    headline,
    entryType,
    columnProps,
  } = transformArticleEntryList(props);

  return (
    <div className="hedi--article-entry-list">
      {headline && (
        <Row>
          <Column>
            {/* TODO headline type from cms */}
            <h2 className="hedi--article-entry-list__headline">{headline}</h2>
          </Column>
        </Row>
      )}
      {entryType === "normal-neighbours" ? (
        <Row narrow>
          {articles.map((article, index) => (
            <Column {...columnProps} key={article.label + index}>
              <ArticleEntry entryType={entryType} {...article} />
            </Column>
          ))}
        </Row>
      ) : (
        <>
          {articles.map((article, index) => (
            <Row narrow key={article.label + index}>
              <Column {...columnProps}>
                <ArticleEntry entryType={entryType} {...article} />
              </Column>
            </Row>
          ))}
        </>
      )}{" "}
    </div>
  );
};
