import { IAppPage } from "@/modules/common/types";
import { Grid, Row, Column, AspectRatio } from "carbon-components-react";
import Link from "next/link";
import { HTMLWithNextImage } from "@/modules/react/html";

export const UserFeedbackThanksView = ({ content }: { content: IAppPage }) => {
  return (
    <>
      {content.posterImage && (
        <AspectRatio ratio="2x1">
          <img
            src={content.posterImage.route}
            alt={content.posterImage.alt}
            className="hedi-header-image hedi-userfeedback-thanks-header"
          />
        </AspectRatio>
      )}
      <Grid>
        <Row>
          <Column
            sm={4}
            md={{ span: 6, offset: 1 }}
            lg={{ span: 8, offset: 4 }}
            className="p-s-xl hedi-article-container">
            {/* TODO should be 'hedi-userfeedback-thanks-container'? */}
            <article>
              <h1 className="pb-s-s hedi-text-left">{content.longTitle}</h1>
              <div className="py-s-md">
                <HTMLWithNextImage data={content.body} />
              </div>
              <div className="hedi-userfeedback-thanks-link-buttons">
                {content.elements.map(element => (
                  <Link
                    key={element.identifier + content.lang}
                    href={"#"}
                    passHref>
                    <a href={"#" /* TODO redirect to correct location */}>
                      {element.value}
                    </a>
                  </Link>
                ))}
              </div>
            </article>
          </Column>
        </Row>
      </Grid>
    </>
  );
};
