import { CategoryEntry } from "../CategoryEntry";
import { CategoryEntryList } from "../CategoryEntryList";
import { Seperator } from "@/modules/common/components";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import { Row, Column } from "carbon-components-react";
import { transformCategory, ICategoryProps } from "./transformCategory";
import { ArticleEntryList } from "@/modules/editorial/article/client";
import { useSubCategories } from "./useSubCategories";
export const Category = (props: ICategoryProps): JSX.Element => {
  const { articles, categories, articleEntryListHeadline } = transformCategory(
    props
  );
  const { hasSubCategories } = useSubCategories(categories);
  return (
    <>
      {categories ? <CategoryEntryList categories={categories} /> : null}

      {hasSubCategories && (
        <Column>
          <Seperator style="dashed" color="gray" />
        </Column>
      )}

      {articles ? (
        <>
          <ArticleEntryList
            entryType={hasSubCategories ? "minimal" : "normal-neighbours"}
            articles={articles}
            headline={hasSubCategories ? articleEntryListHeadline : undefined}
          />
        </>
      ) : null}
    </>
  );
};
