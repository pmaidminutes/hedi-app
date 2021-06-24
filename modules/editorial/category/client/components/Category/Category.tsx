import { CategoryEntry } from "../CategoryEntry";
import { CategoryEntryList } from "../CategoryEntryList";
import { Seperator } from "@/modules/common/components";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import { Row, Column } from "carbon-components-react";
import { transformCategory, ICategoryProps } from "./transformCategory";
export const Category = (props: ICategoryProps): JSX.Element => {
  const { articles, categories } = transformCategory(props);
  return (
    <>
      {categories ? <CategoryEntryList categories={categories} /> : null}

      {articles ? (
        <>
          <Seperator />
          <Row>
            {articles?.map(article => (
              <Column sm={4} md={4} lg={8} key={article.route}>
                <ArticleEntry article={article} />
              </Column>
            ))}
          </Row>
        </>
      ) : null}
    </>
  );
};
