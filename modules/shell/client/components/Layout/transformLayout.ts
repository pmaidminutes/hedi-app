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
  } = layout;

  const posterImgSrc = posterImage
    ? process.env.NEXT_PUBLIC_ASSETS_URL + posterImage.route
    : undefined;

  const left = leftColumnProps ?? { sm: 0, md: 2, lg: 5, xlg: 4 };
  const right = rightColumnProps ?? { md: 4, lg: 8, xlg: 8 };
  const single = singleColumnProps ?? {};

  const wrapperClass = `hedi--simple-page ${
    id !== undefined ? `hedi--${id}-page` : ""
  } ${customKey !== undefined ? `hedi--${customKey}` : ""}`;

  const groupClass = `hedi--group hedi--group--${id}`;

  return {
    right,
    left,
    posterImgSrc,
    posterImage,
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
