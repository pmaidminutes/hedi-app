import Image from "next/image";
import { HeroImage } from "@/modules/common/components";
import { transformLayout } from "./transformLayout";
import { ILayoutProps } from "./types";
import {
  SingleColumn,
  TwoColumns,
  Editorial,
  Blank,
  Category,
} from "./templates";

export const Layout: React.FC<ILayoutProps> = props => {
  const {
    left,
    right,
    posterImgSrc,
    posterImage,
    wrapperClass,
    pageLayout,
    condensed,
    narrow,
    headline,
    children,
    groupClass,
    single,
    sideComponents,
    breadcrumbs,
  } = transformLayout(props);

  return (
    <div className={wrapperClass}>
      {posterImage && posterImgSrc && (
        <HeroImage color="green" image={posterImage} />
      )}
      {pageLayout === "singleColumn" ? (
        <SingleColumn
          columnProps={single}
          headline={headline}
          groupClass={groupClass}
          narrow={narrow}
          condensed={condensed}>
          {children}
        </SingleColumn>
      ) : pageLayout === "twoColumns" ? (
        <TwoColumns
          headline={headline}
          groupClass={groupClass}
          left={left}
          right={right}
          sideComponents={sideComponents}>
          {children}
        </TwoColumns>
      ) : pageLayout === "editorial" ? (
        <Editorial
          breadcrumbs={breadcrumbs}
          columnProps={single}
          headline={headline}
          groupClass={groupClass}
          narrow={narrow}
          condensed={condensed}>
          {children}
        </Editorial>
      ) : pageLayout === "category" ? (
        <Category
          breadcrumbs={breadcrumbs}
          headline={headline}
          groupClass={groupClass}>
          {children}
        </Category>
      ) : pageLayout === "blank" ? (
        <Blank headline={headline} groupClass={groupClass}>
          {children}
        </Blank>
      ) : null}
    </div>
  );
};
