import Image from "next/image";
import { transformLayout } from "./transformLayout";
import { ILayoutProps } from "./types";
import { SingleColumn, ImageAndColumn } from "./templates";

export const Layout: React.FC<ILayoutProps> = props => {
  const {
    left,
    layoutImg,
    right,
    posterImgSrc,
    posterImage,
    wrapperClass,
    pageLayout,
    condensed,
    narrow,
    body,
    headline,
    children,
    groupClass,
    single,
  } = transformLayout(props);

  return (
    <div className={wrapperClass}>
      {posterImage && posterImgSrc && (
        <Image
          className="hedi--hero-image"
          src={posterImgSrc}
          alt={posterImage.alt}
          width={posterImage.width}
          height={posterImage.height}
          layout="responsive"
        />
      )}
      {pageLayout === "imageAndColumn" ? (
        <ImageAndColumn
          headline={headline}
          body={body}
          groupClass={groupClass}
          left={left}
          right={right}
          layoutImg={layoutImg}>
          {children}
        </ImageAndColumn>
      ) : pageLayout === "singleColumn" ? (
        <SingleColumn
          columnProps={single}
          headline={headline}
          body={body}
          groupClass={groupClass}
          narrow={narrow}
          condensed={condensed}>
          {children}
        </SingleColumn>
      ) : null}
    </div>
  );
};
