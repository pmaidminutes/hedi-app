import Link from "next/link";
// Types
import { ICategory } from "@/modules/editorial/types";
import { ITypename } from "@/common/model/cms";

interface ICategoryProps {
  content: ICategory;
}

export const TryCategory = (content: ITypename) =>
  content.typeName === "Category" ? (
    <Category content={content as ICategory} />
  ) : null;

export const Category = ({ content }: ICategoryProps) => {
  const { categories, label, articles } = content;
  return (
    <div className="bx--col bx--no-gutter bx--grid">
      <div className="bx--row">
        <div className="bx--col bx--col-auto">
          <div className="bx--snippet bx--skeleton bx--snippet--multi bx--aspect-ratio bx--aspect-ratio--2x1">
            poster image
          </div>
        </div>
        <div className="bx--col">
          <h1>{label}</h1>
        </div>
      </div>

      {categories.length > 0 &&
        categories.map((category, index) => (
          <div className="bx--row bx--row-padding" key={index}>
            <div className="bx--col-md-2">
              <div className="bx--snippet bx--skeleton bx--snippet--multi bx--aspect-ratio bx--aspect-ratio--2x1">
                poster image
              </div>
            </div>
            <div className="bx--col">
              <Link href={category.urlpath} passHref>
                <a className="bx--link">
                  <h3>{category.label}</h3>
                </a>
              </Link>
            </div>
          </div>
        ))}
      {articles.length > 0 &&
        articles.map((article, index) => (
          <div className="bx--row bx--row-padding" key={index}>
            <div className="bx--col">
              <Link href={article.urlpath} passHref>
                <a className="bx--link">
                  <h3>{article.label}</h3>
                </a>
              </Link>
              <div
                className="bx--text"
                dangerouslySetInnerHTML={{
                  __html: article.summary,
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
};
