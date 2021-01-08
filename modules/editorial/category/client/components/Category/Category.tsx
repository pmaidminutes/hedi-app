// Types
import { ICategory } from "../../../types";
import { ITyped } from "@/common/model/cms";
import { CategoryEntry } from "../CategoryEntry";
import { ArticleEntry } from "@/modules/editorial/article/client/components";

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
    <div className="bx--grid">
      <div className="bx--row">
        <a
          href="https://postimg.cc/gx98QBnR"
          target="_blank"
          className="bx--col-sm-4 bx--col-md-5 bx--col-lg-10 bx--aspect-ratio bx--aspect-ratio--2x1">
          <img
            src="https://i.postimg.cc/6pqc7kKH/header2x1.jpg"
            alt="illustration of sleeping family"
            className="hedi-header-image"
          />
        </a>

        <div
          className="bx--col bx--col-sm-4 bx--col-lg-6"
          style={{ alignSelf: "center" }}>
          <h2>{label}</h2>
          <h3>{}</h3>
        </div>
      </div>
      {categories.length > 0 ? (
        <>
          <h3 className="mt-l-sm">Topic subcategories</h3>
          <div className="bx--row">
            {categories.map(category => (
              <div
                className="bx--col bx--col-sm-4 bx--col-md-4 bx--col-lg-4 mt-s-md"
                style={{ overflowWrap: "break-word" }}
                key={category.route}>
                <CategoryEntry category={category} />
              </div>
            ))}
          </div>
        </>
      ) : null}

      <div className="hedi-separator"></div>

      <div className="bx--grid">
        <div className="bx--tile-container">
          <div className="bx--row">
            {articles?.map(article => (
              <div
                className="bx--col-sm-4 bx--col-md-4 bx--col-lg-8"
                key={article.route}>
                <ArticleEntry article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};