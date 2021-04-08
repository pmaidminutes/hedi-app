import { TagList } from "@/modules/common/components";
import { ITyped } from "@/modules/model";
import { HTMLWithNextImage } from "@/modules/react/html";
import { IPage } from "../../../types";
import { Grid, Row, Column, AspectRatio } from "carbon-components-react";
interface IPageProps {
  content: IPage;
}

// UNUSED
export const TryPage = (content: ITyped): JSX.Element | null =>
  content.type === "Page" ? <Page content={content as IPage} /> : null;

export const Page = ({ content }: IPageProps): JSX.Element => {
  const { label, body, tags } = content;

  return (
    <>
      <AspectRatio ratio="2x1">
        <img
          src={process.env.NEXT_PUBLIC_ARTICLE_HEADER_TMP}
          alt="illustration of sleeping family"
          className="hedi-header-image"
        />
      </AspectRatio>
      <Grid>
        <Row>
          <Column
            sm={4}
            md={{ span: 6, offset: 1 }}
            lg={{ span: 8, offset: 4 }}
            className="p-s-xl hedi-article-container">
            <article>
              <h1 className="pb-s-s hedi-text-center">{label}</h1>
              <h4 className="pb-s-md hedi-text-center">
                Subheadline Placeholder
              </h4>
              {
                //TODO style needs to be updated in Audio
                //TODO url needs to be updated in Audio
                // TODO on switch of translation audio is not changing in refresh
                //TODO fix static url hard code and fix in safari for audio
              }
              <div className="py-s-md">
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
          <div className="hedi-separator"></div>
          {/* <TagList tags={tags} />{" "} //TODO currently broken due to work in IService */}
        </>
      ) : null}
    </>
  );
};
