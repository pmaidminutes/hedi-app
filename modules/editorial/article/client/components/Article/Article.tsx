import { AudioPlayer, TagList, Seperator } from "@/modules/common/components";
import { buildAssetUrl } from "@/modules/common/utils";
import { ITyped } from "@/modules/model";
import { HTMLWithNextImage } from "@/modules/react/html";
import { IArticle } from "../../../types";
import { Grid, Row, Column, AspectRatio } from "carbon-components-react";

interface IArticleProps {
  content: IArticle;
}

// UNUSED
export const TryArticle = (content: ITyped): JSX.Element | null =>
  content.type === "Article" ? <Article content={content as IArticle} /> : null;

export const Article = ({ content }: IArticleProps): JSX.Element => {
  const { label, body, audio, tags } = content;

  return (
    <>
      <AspectRatio ratio="2x1">
        <img
          src="https://i.postimg.cc/6pqc7kKH/header2x1.jpg"
          alt="illustration of sleeping family"
          className="hedi-header-image"
          style={{ maxWidth: "100%" }}
        />
      </AspectRatio>

      <Grid>
        <Row>
          <Column
            sm={4}
            md={{ span: 6, offset: 1 }}
            lg={{ span: 8, offset: 4 }}>
            <article>
              <h1>{label}</h1>
              <h4>Subheadline Placeholder</h4>
              {
                //TODO style needs to be updated in Audio
                //TODO url needs to be updated in Audio
                // TODO on switch of translation audio is not changing in refresh
                //TODO fix static url hard code and fix in safari for audio
              }
              {audio !== null ? (
                <AudioPlayer src={buildAssetUrl(audio?.route)} />
              ) : null}
              <div>
                <HTMLWithNextImage data={body} />
              </div>
            </article>
          </Column>
        </Row>
      </Grid>
      {/* TODO: add semantic corretc html */}
      {tags.length > 0 ? (
        <>
          {" "}
          <Seperator />
          {/* <TagList tags={tags} />{" "} //TODO currently broken due to work in IService */}
        </>
      ) : null}
    </>
  );
};
