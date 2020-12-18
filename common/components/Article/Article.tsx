// Types
import { ITypename } from "@/common/model/cms";
import { TagList } from "@/hedi-components/TagList";
import { IArticle } from "@/modules/editorial/types";
import { AudioPlayer } from "@components";
import { buildAssetUrl } from "../../utils";

interface IArticleProps {
  content: IArticle;
}

export const TryArticle = (content: ITypename) =>
  content.typeName === "Article" ? (
    <Article content={content as IArticle} />
  ) : null;

export const Article = ({ content }: IArticleProps) => {
  const { label, body, category, audio, tags } = content;

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
          <div className="bx--col-sm-4 bx--col-md-6 bx--col-lg-8 bx--offset-md-1 bx--offset-lg-4 p-s-xl hedi-article-container">
            <article>
              <h1 className="pb-s-s" style={{ textAlign: "center" }}>
                {label}
              </h1>
              <h4 className="pb-s-md" style={{ textAlign: "center" }}>
                Subheadline Placeholder
              </h4>
              {
                //TODO style needs to be updated in Audio
                //TODO url needs to be updated in Audio
                // TODO on switch of translation audio is not changing in refresh
                //TODO fix static url hard code and fix in safari for audio
              }
              {audio !== null ? (
                <AudioPlayer src={buildAssetUrl(audio?.url)} />
              ) : null}
              <div
                className="py-s-md"
                dangerouslySetInnerHTML={{
                  __html: body,
                }}></div>
            </article>
          </div>
        </div>
      </div>
      {/* TODO: add semantic corretc html */}
      {tags.length > 0 ? (
        <>
          {" "}
          <div className="hedi-separator"></div>
          <TagList tags={tags} />{" "}
        </>
      ) : null}
    </>
  );
};
