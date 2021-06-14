import React from "react";
import { ArticleEntry } from "@/modules/editorial/article/client";
import { ICategoryEntry } from "../../../types";
import { CategoryEntry } from "../CategoryEntry";
import {
  ICategoryRootProps,
  transformCategoryRoot,
} from "./transformCategoryRoot";
export const CategoryRoot = (props: ICategoryRootProps) => {
  const { categories, articles } = transformCategoryRoot(props);
  return (
    <section>
      {categories.map((category, index) => (
        <CategoryEntry
          key={category.label + index}
          category={category as ICategoryEntry}
        />
      ))}
      {articles &&
        articles.map((article, index) => (
          <ArticleEntry key={article.label + index} article={article} />
        ))}
    </section>
  );
};
