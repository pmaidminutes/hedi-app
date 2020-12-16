// Types
import { IArticle } from "@/modules/editorial/types";
import { ITypename } from "@/common/model/cms";

import { TagList } from "@/hedi-components/TagList";
interface IArticleProps {
  content: IArticle;
}

export const TryArticle = (content: ITypename) =>
  content.typeName === "Article" ? (
    <Article content={content as IArticle} />
  ) : null;

export const Article = ({ content }: IArticleProps) => {
  const { label, body, category } = content;

  const exampleTags = [
    "Course of pregnancy",
    "Example Tag",
    "Schwangerschaftsverlauf",
  ];

  return (
    <>
      <a
        href="#"
        target="_blank"
        className="bx--aspect-ratio bx--aspect-ratio--2x1">
        <img
          src="https://i.postimg.cc/6pqc7kKH/header2x1.jpg"
          alt="illustration of sleeping family"
          className="hedi-header-image"
        />
      </a>
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-md-1 bx--col-lg-3"></div>
          <div
            className="bx--col-sm-4 bx--col-md-6 bx--col-lg-10 p-s-xl hedi-article-container">
            <article>
              <h1 className="pb-s-s" style={{ textAlign: "center" }}>
                {label}
              </h1>
              <h4 className="pb-s-md" style={{ textAlign: "center" }}>
                Subheadline Placeholder
              </h4>

              <div
                style={{
                  width: "70%",
                  padding: "1rem 0",
                  margin: "auto",
                  backgroundColor: "grey",
                }}>
                Placeholder for Audio
              </div>

              <div
                className="py-s-md"
                dangerouslySetInnerHTML={{
                  __html: body,
                }}></div>
            </article>
          </div>
          {/* <div className="bx--col-md-1 bx--col-lg-3"></div> */}
        </div>
      </div>
      <div className="hedi-separator"></div>
      <TagList tags={exampleTags} />
    </>
  );
};
