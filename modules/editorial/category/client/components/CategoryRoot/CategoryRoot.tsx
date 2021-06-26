import React from "react";
import { ICategoryRoot } from "../../../types";
import { transformCategoryRoot } from "./transformCategoryRoot";
import { Column, Row } from "carbon-components-react";
import { Label, Body } from "@/modules/components";
import { SearchInput } from "@/modules/search/client/components";
import { MainCategoryCardList } from "../MainCategoryCardList";
import { ArticleEntryList } from "@/modules/editorial/article/client/components/ArticleEntryList";
export const CategoryRoot = (props: ICategoryRoot) => {
  const {
    categories,
    articles,
    headline,
    text,
    allArticlesHeadline,
    searchPlaceholder,
  } = transformCategoryRoot(props);
  return (
    <section className="hedi--category-root">
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
          <SearchInput
            light={true}
            onQueryChanged={() => console.log("query changed")}
            placeHolderText={searchPlaceholder}
          />
        </Column>
      </Row>

      {categories && <MainCategoryCardList categories={categories} />}
      {articles && (
        <ArticleEntryList headline={allArticlesHeadline} articles={articles} />
      )}
    </section>
  );
};
