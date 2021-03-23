import { IAppPage } from "@/modules/common/types";
import { Grid, Row, Column, AspectRatio } from "carbon-components-react";
import Image from "next/image";
import { HTMLWithNextImage } from "@/modules/react/html";

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
          <Column sm={0} md={2} lg={{ span: 4, offset: 2 }}>
            hier kommt vom CMS das IMG- SVG Schwangere oder Baby
            <img src="././public/Pregnancy_pink80.svg" alt=""></img>
          </Column>
          <Column sm={4} md={6} lg={8} className="hedi--titlegroup">
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
