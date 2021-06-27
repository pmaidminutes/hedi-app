import { IImageProps } from "@/modules/components";
import { ILayoutProps } from "./types";

export function transformLayout(props: ILayoutProps) {
  const { content, layout, children } = props;
  const { id, label } = content;

  const {
    leftColumnProps,
    rightColumnProps,
    customKey,
    pageLayout,
    condensed,
    narrow,
    singleColumnProps,
    posterImage,
    sideComponents,
    headline,
    breadcrumbs,
    pageType,
  } = layout;

  const image = posterImage as IImageProps;
  const left = leftColumnProps ?? { sm: 0, md: 2, lg: 5, xlg: 4 };
  const right = rightColumnProps ?? { md: 4, lg: 8, xlg: 8 };
  const single = singleColumnProps ?? {};

  const wrapperClass = `hedi--simple-page ${
    id !== undefined ? `hedi--${id}-page` : ""
  } ${customKey !== undefined ? `hedi--${customKey}` : ""}`;

  const groupClass = `hedi--group hedi--group--${id}`;

  if (pageType) {
    image.objectFit = pageType === "Category" ? "cover" : "scale-down";
    image.objectPosition = pageType === "Category" ? "top center" : "center";
  }

  return {
    right,
    left,
    image,
    wrapperClass,
    pageLayout,
    content,
    condensed,
    narrow,
    headline: headline || label,
    children,
    groupClass,
    single,
    sideComponents,
    breadcrumbs: breadcrumbs || null,
  };
}
