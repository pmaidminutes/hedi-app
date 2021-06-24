import { CategoryEntry } from "../CategoryEntry";
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
      {categories ? (
        <>
          <Row>
            <Column {...{ sm: 2, md: 4, lg: 8, xlg: 8 }}>
              <Row>
                {categories.map(category => (
                  <Column
                    {...{ sm: 2, md: 4, lg: 8, xlg: 8 }}
                    key={category.route}>
                    <CategoryEntry category={category} />
                  </Column>
                ))}
              </Row>
            </Column>
          </Row>
        </>
      ) : null}

      {articles ? (
        <>
          <Seperator />
          <ArticleEntryList
            type={hasSubCategories ? "oneColumn" : "twoColumns"}
            articles={articles}
          />
        </>
      ) : null}
    </>
  );
};
