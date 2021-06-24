import React from "react";
import { ICategoryRoot } from "../../../types";
import { transformCategoryRoot } from "./transformCategoryRoot";
import { Column, Row } from "carbon-components-react";
import { Label, Body } from "@/modules/components";
import { SearchInput } from "@/modules/search/client/components";
import { MainCategoryCardList } from "../MainCategoryCardList";
import {
  ArticleEntryList,
  ArticleTeaser,
} from "@/modules/editorial/article/client/components/";
export const CategoryRoot = (props: ICategoryRoot) => {
  console.log({ props });
  const {
    categories,
    articles,
    headline,
    text,
    recommendedArticles,
  } = transformCategoryRoot(props);
  return (
    <section>
      {headline && (
        <Row>
          <Column md={{ span: 4 }}>
            <Label {...headline} />
          </Column>
        </Row>
      )}
      {text && (
        <Row>
          <Column md={{ span: 4 }}>
            <Body {...text} />
          </Column>
        </Row>
      )}
      <Row>
        <Column md={{ span: 4, offset: 4 }}>
          <SearchInput onQueryChanged={() => console.log("query changed")} />
        </Column>
      </Row>

      <ArticleTeaser headline="Überschrift" articles={recommendedArticles} />
      {categories && <MainCategoryCardList categories={categories} />}
      {articles && <ArticleEntryList articles={articles} />}
    </section>
  );
};
