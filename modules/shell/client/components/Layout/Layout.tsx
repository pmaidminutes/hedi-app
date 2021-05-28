import Image from "next/image";
import { transformLayout } from "./transformLayout";
import { ILayoutProps } from "./types";
import {
  SingleColumn,
  ImageAndColumn,
  Categories,
  TwoColumns,
} from "./templates";

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
    sideComponents,
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
      ) : pageLayout === "categories" ? (
        <Categories headline={headline} groupClass={groupClass}>
          {children}
        </Categories>
      ) : pageLayout === "twoColumns" ? (
        <TwoColumns
          headline={headline}
          body={body}
          groupClass={groupClass}
          left={left}
          right={right}
          sideComponents={sideComponents}>
          {children}
        </TwoColumns>
      ) : null}
    </div>
  );
};
