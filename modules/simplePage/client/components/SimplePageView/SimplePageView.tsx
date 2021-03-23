import { IAppPage } from "@/modules/common/types";
import { HTMLWithNextImage } from "@/modules/react/html";
import { AspectRatio, Column, Grid, Row } from "carbon-components-react";
import Image from "next/image";

export const SimplePageView: React.FC<{
  content: IAppPage;
  url?: string;
  alt?: string;
}> = ({ content, url, alt, children }) => {
  return (
    <div className={`hedi--simple-page hedi--${content.key}-page`}>
      {content.posterImage && (
          <Image
            src={
              "https://appstaging.projekt-hedi.de" + content.posterImage.route
            }
            alt={content.posterImage.alt}
            className="hedi-header-image"
            width={content.posterImage.width}
            height={content.posterImage.height}
          />
      )}

      <Grid condensed fullWidth>
        <Row>
          {url ? (
            <Column sm={0} md={3} lg={6}>
              <div className="hedi--app-page-image">
                <img src={url} alt={alt ?? ""}></img>
              </div>
            </Column>
          ) : null}
          <Column>
            <Grid>
              <Row>
                <Column className="hedi--titlegroup">
                  <h1>{content.longTitle ?? content.label}</h1>
                  <HTMLWithNextImage data={content.body} />
                </Column>
              </Row>
              {children && (
                <div className={`hedi--group hedi--group--${content.key}`}>
                  {children}
                </div>
              )}
            </Grid>
          </Column>
        </Row>
      </Grid>
    </div>
  );
};
