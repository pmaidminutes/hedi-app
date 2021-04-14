import { IAppPage } from "@/modules/common/types";
import { ColumnDefaultProps } from "carbon-components-react";
import React from "react";
import { PageLayout, ILayoutImage } from "../../../types";



export interface ILayout {
  content: IAppPage;
  layoutImg?: ILayoutImage;
  customKey?: string;
  condensed?: boolean;
  narrow?: boolean;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  pageLayout: PageLayout;
  children: React.ReactNode;
}

export interface ILayoutBasicTemplate {
  headline: string;
  body: string;
  groupClass: string;
  condensed?: boolean;
  narrow?: boolean;
}

export function transformLayout(props: ILayout) {
  const {
    content,
    layoutImg,
    customKey,
    leftColumnProps,
    rightColumnProps,
    pageLayout,
    condensed,
    narrow,
    children
  } = props;
  const { posterImage, key, longTitle, label, body } = content;

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
    groupClass
  };
}
