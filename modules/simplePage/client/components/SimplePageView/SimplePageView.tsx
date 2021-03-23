import { IAppPage } from "@/modules/common/types";
import { HTMLWithNextImage } from "@/modules/react/html";
import { AspectRatio, Column, Grid, Row } from "carbon-components-react";
import Image from "next/image";

export const SimplePageView: React.FC<{
  content: IAppPage;
}> = ({ content, children }) => {
  return (
    <div className={`hedi--simple-page hedi--${content.key}-page`}>
      {content.posterImage && (
        <AspectRatio ratio="2x1">
          <Image
            src={
              "https://appstaging.projekt-hedi.de" + content.posterImage.route
            }
            alt={content.posterImage.alt}
            className="hedi-header-image"
            width={content.posterImage.width}
            height={content.posterImage.height}
          />
        </AspectRatio>
      )}
      <Grid>
        <Row>
          <Column>
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
    </div>
  );
};
