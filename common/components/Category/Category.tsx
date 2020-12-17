import Link from "next/link";
// Types
import { ICategory } from "@/modules/editorial/types";
import { ITypename } from "@/common/model/cms";
import { buildAssetUrl } from "../../utils";
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
                key={category.urlpath}>
                <Link href={category.urlpath} passHref>
                  <a className="hedi-unstyled-link">
                    {category.image === null ? (
                      <div
                        className="bx--aspect-ratio bx--aspect-ratio--2x1"
                        style={{ backgroundColor: "darkcyan" }}>
                        {" "}
                        picture here{" "}
                      </div>
                    ) : (
                      <div className="bx--aspect-ratio bx--aspect-ratio--2x1">
                        <img
                          className="hedi-responsive-image"
                          src={buildAssetUrl(category.image?.url)}
                          alt={category.image?.alt}
                        />
                      </div>
                    )}
                    <h4>{category.label}</h4>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : null}

      <div className="hedi-separator"></div>

      <div className="bx--grid">
        <div className="bx--tile-container">
          <div className="bx--row">
            {articles.length > 0 &&
              articles.map(article => (
                <div
                  className="bx--col-sm-4 bx--col-md-4 bx--col-lg-8"
                  key={article.urlpath}>
                  <Link href={article.urlpath} passHref>
                    <a
                      href="#"
                      className="bx--tile bx--tile--clickable hedi-unstyled-link">
                      <h4 className="pb-s-sm">{article.label}</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: article.summary,
                        }}></p>
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
