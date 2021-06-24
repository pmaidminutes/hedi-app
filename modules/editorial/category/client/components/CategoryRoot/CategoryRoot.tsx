import React from "react";
import { ArticleEntry } from "@/modules/editorial/article/client";
import { ICategoryEntry, ICategoryRoot } from "../../../types";
import { CategoryEntry } from "../CategoryEntry";
import { transformCategoryRoot } from "./transformCategoryRoot";
import { Column, Row, Grid } from "carbon-components-react";
import { Label, Body } from "@/modules/components";
import { SearchInput } from "@/modules/search/client/components";
import { MainCategoryCardList } from "../MainCategoryCardList";
import { ArticleEntryList } from "@/modules/editorial/article/client/components/ArticleEntryList";
export const CategoryRoot = (props: ICategoryRoot) => {
  const { categories, articles, headline, text } = transformCategoryRoot(props);
  return (
    <section>
      {/* TODO spacing and check, why Headline got a p tag */}
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

      {categories && <MainCategoryCardList categories={categories} />}
      {articles && <ArticleEntryList articles={articles} />}
    </section>
  );
};
