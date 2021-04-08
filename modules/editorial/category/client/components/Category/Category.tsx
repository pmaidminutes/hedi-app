import { ICategory } from "../../../types";
import { ITyped } from "@/modules/model";
import { CategoryEntry } from "../CategoryEntry";
import { Seperator } from "@/modules/common/components";
import { ArticleEntry } from "@/modules/editorial/article/client/components";
import { Grid, Row, Column, AspectRatio } from "carbon-components-react";
interface ICategoryProps {
  content: ICategory;
}

//UNUSED
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
              src={process.env.NEXT_PUBLIC_ARTICLE_HEADER_TMP}
              alt="illustration of sleeping family"
              className="hedi-header-image"
              style={{ maxWidth: "100%" }}
            />
          </AspectRatio>
        </Column>
        <Column sm={4} lg={6}>
          <h2>{label}</h2>
        </Column>
      </Row>
      {categories.length > 0 ? (
        <>
          <h3 className="mt-l-sm">Topic subcategories</h3>
          <Row>
            {categories.map(category => (
              <Column key={category.route}>
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
