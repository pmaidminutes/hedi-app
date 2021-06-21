import React from "react";
import { ArticleEntry } from "@/modules/editorial/article/client";
import { ICategoryEntry, ICategoryRoot } from "../../../types";
import { CategoryEntry } from "../CategoryEntry";
import { transformCategoryRoot } from "./transformCategoryRoot";
import { Column, Row, Grid } from "carbon-components-react";
import { Label, Body } from "@/modules/components";
import { SearchInput } from "@/modules/search/client/components";
import { MainCategoryCardList } from "../MainCategoryCardList";
export const CategoryRoot = (props: ICategoryRoot) => {
  console.log({ props });
  const { categories, articles, headline, text } = transformCategoryRoot(props);
  return (
    <section>
      <Row>
        <Column lg={{ span: 14, offset: 1 }} className="hedi--col--grid-nest">
          <Grid>
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
                <SearchInput
                  onQueryChanged={() => console.log("query changed")}
                />
              </Column>
            </Row>
          </Grid>
        </Column>
      </Row>
      <MainCategoryCardList {...props} />
      {/* MainCategoryCardList */}
      {/* {categories.map((category, index) => (
        <CategoryEntry
          key={category.label + index}
          category={category as ICategoryEntry}
        />
      ))} */}
      {/* ArticleEntryList */}
      {/* {articles &&
        articles.map((article, index) => (
          <ArticleEntry key={article.label + index} article={article} />
        ))} */}
    </section>
  );
};
