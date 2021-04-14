import { ILayoutProps } from "./types";

export function transformLayout(props: ILayoutProps) {
  const { content, layout, children } = props;
  const { posterImage, key, longTitle, label, body } = content;
  const {
    leftColumnProps,
    rightColumnProps,
    customKey,
    pageLayout,
    condensed,
    narrow,
    layoutImg,
  } = layout;

  const posterImgSrc = process.env.NEXT_PUBLIC_ASSETS_URL + posterImage.route;

  const left = leftColumnProps ?? { sm: 0, md: 2, lg: 5, xlg: 4 };
  const right = rightColumnProps ?? { md: 4, lg: 8, xlg: 8 };

  const wrapperClass = `hedi--simple-page ${
    key !== undefined ? `hedi--${key}-page` : ""
  } ${customKey !== undefined ? `hedi--${customKey}` : ""}`;

  const groupClass = `hedi--group hedi--group--${key}`;

  return {
    right,
    left,
    layoutImg,
    posterImgSrc,
    posterImage,
    wrapperClass,
    pageLayout,
    content,
    condensed,
    narrow,
    body,
    headline: longTitle || label,
    children,
    groupClass,
  };
}
