import { IAppPage } from "@/modules/common/types";
import { Grid, Row, Column, AspectRatio } from "carbon-components-react";
import Link from "next/link";
import Image from "next/image";
import { HTMLWithNextImage } from "@/modules/react/html";

export const AppPageView: React.FC<{
  content: IAppPage;
  rootCssClass?: string;
}> = ({ content, rootCssClass, children }) => {
  return (
    <div className={rootCssClass}>
      {content.posterImage && (
        <AspectRatio ratio="2x1">
          <Image
            src={content.posterImage.route}
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
            <div className="hedi-app-page-link-buttons">
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
          </Column>
        </Row>
        {children && (
          <Row>
            <Column>{children}</Column>
          </Row>
        )}
      </Grid>
    </div>
  );
};
