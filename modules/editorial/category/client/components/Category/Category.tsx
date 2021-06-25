import { CategoryEntry } from "../CategoryEntry";
import { CategoryEntryList } from "../CategoryEntryList";
import { Seperator } from "@/modules/common/components";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import { Row, Column } from "carbon-components-react";
import { transformCategory, ICategoryProps } from "./transformCategory";
import { ArticleEntryList } from "@/modules/editorial/article/client";
import { useSubCategories } from "./useSubCategories";
export const Category = (props: ICategoryProps): JSX.Element => {
  const { articles, categories } = transformCategory(props);
  const { hasSubCategories } = useSubCategories(categories);
  return (
    <>
      {categories ? <CategoryEntryList categories={categories} /> : null}

      {articles ? (
        <>
          <ArticleEntryList
            type={hasSubCategories ? "oneColumn" : "twoColumns"}
            articles={articles}
          />
        </>
      ) : null}
    </>
  );
};
