import { ICategory } from "../../../types";
import { ITyped } from "@/modules/model";
import { CategoryEntry } from "../CategoryEntry";
import { Seperator } from "@/modules/common/components";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import { Grid, Row, Column, AspectRatio } from "carbon-components-react";
interface ICategoryProps {
  content: ICategory;
}

export const TryCategory = (content: ITyped): JSX.Element | null =>
  content.type === "Category" || content.type === "CategoryRoot" ? (
    <Category content={content as ICategory} />
  ) : null;

export const Category = ({ content }: ICategoryProps): JSX.Element => {
  const { categories, label, articles } = content;
  return (
    /*-- ------------ main category row -------------- --*/
    <Grid>
      <Row>
        <Column sm={4} md={5} lg={10}>
          <AspectRatio ratio="2x1">
            <img
              src="https://i.postimg.cc/6pqc7kKH/header2x1.jpg"
              alt="illustration of sleeping family"
              className="hedi-header-image"
            />
          </AspectRatio>
        </Column>
        <Column sm={4} lg={6} className="hedi-self-center">
          <h2>{label}</h2>
        </Column>
      </Row>
      {categories.length > 0 ? (
        <>
          <h3 className="mt-l-sm">Topic subcategories</h3>
          <Row>
            {categories.map(category => (
              <Column className="mt-s-md hedi-break-word" key={category.route}>
                <CategoryEntry category={category} />
              </Column>
            ))}
          </Row>
        </>
      ) : null}

      <Seperator />

      <Row>
        {articles?.map(article => (
          <Column sm={4} md={4} lg={8} key={article.route}>
            <ArticleEntry article={article} />
          </Column>
        ))}
      </Row>
    </Grid>
  );
};
