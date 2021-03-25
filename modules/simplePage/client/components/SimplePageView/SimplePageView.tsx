import { IAppPage } from "@/modules/common/types";
import { HTMLWithNextImage } from "@/modules/react/html";
import { Column, Grid, Row } from "carbon-components-react";
import Image from "next/image";

export const SimplePageView: React.FC<{
  content: IAppPage;
  url?: string;
  alt?: string;
  customKey?: string;
}> = ({ content, url, alt, customKey, children }) => {
  return (
    <div
      className={`hedi--simple-page ${
        content.key !== undefined ? `hedi--${content.key}-page` : null
      } ${customKey !== undefined ? `hedi--${customKey}` : null}`}>
      {content.posterImage && (
        <Image
          src={"https://appstaging.projekt-hedi.de" + content.posterImage.route}
          alt={content.posterImage.alt}
          className="hedi-header-image"
          width={content.posterImage.width}
          height={content.posterImage.height}
        />
      )}

      <Grid fullWidth>
        <Row>
          {url ? (
            <Column sm={0} md={3} lg={6}>
              <div className="hedi--app-page-image">
                <img src={url} alt={alt ?? ""}></img>
              </div>
            </Column>
          ) : null}
          <Column>
            <Column className="hedi--titlegroup">
              <h1>{content.longTitle ?? content.label}</h1>
              <HTMLWithNextImage data={content.body} />
            </Column>
            {children && (
              <div className={`hedi--group hedi--group--${content.key}`}>
                {children}
              </div>
            )}
          </Column>
        </Row>
      </Grid>
    </div>
  );
};
