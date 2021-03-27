import { IAppPage } from "@/modules/common/types";
import { HTMLWithNextImage } from "@/modules/react/html";
import { Column, ColumnDefaultProps, Grid, Row } from "carbon-components-react";
import Image from "next/image";

export const SimplePageView: React.FC<{
  content: IAppPage;
  url?: string;
  alt?: string;
  customKey?: string;
  condensed?: boolean;
  narrow?: boolean;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
}> = props => {
  const { content, url, customKey, leftColumnProps, rightColumnProps } = props;
  const left = leftColumnProps ?? { sm: 0, md: 2, lg: 5, xlg: 4 };
  const right = rightColumnProps ?? { md: 4, lg: 8, xlg: 8 };

  return (
    <div
      className={`hedi--simple-page ${
        content.key !== undefined ? `hedi--${content.key}-page` : ""
      } ${customKey !== undefined ? `hedi--${customKey}` : ""}`}>
      {content.posterImage && (
        <Image
          className="hedi--hero-image"
          src={"https://assets.projekt-hedi.de" + content.posterImage.route}
          alt={content.posterImage.alt}
          width={content.posterImage.width}
          height={content.posterImage.height}
        />
      )}
      {!!url ? (
        <TwoColumns {...props} left={left} right={right} />
      ) : (
        <SingleColumn {...props} />
      )}
    </div>
  );
};

const SingleColumn: React.FC<{
  content: IAppPage;
  condensed?: boolean;
  narrow?: boolean;
}> = ({ content, condensed, narrow, children }) => (
  <Grid>
    <Row condensed={condensed} narrow={narrow}>
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
);

const TwoColumns: React.FC<{
  content: IAppPage;
  url?: string;
  alt?: string;
  condensed?: boolean;
  narrow?: boolean;
  left?: ColumnDefaultProps;
  right?: ColumnDefaultProps;
}> = ({ content, url, alt, condensed, narrow, left, right, children }) => (
  <Grid>
    <Row>
      <Column {...left} className="hedi-app-page-image-wrapper">
        <div className="hedi--app-page-image">
          <img src={url} alt={alt ?? ""}></img>
        </div>
      </Column>

      <Column {...right} className="hedi--col--grid-nest">
        <Grid>
          <Row condensed={condensed} narrow={narrow}>
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
);
