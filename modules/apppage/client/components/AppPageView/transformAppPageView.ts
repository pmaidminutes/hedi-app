import { IAppPage } from "@/modules/common/types";
import React from "react";

export interface IAppPageProps {
  content: IAppPage;
  customKey?: string;
  condensed?: boolean;
  narrow?: boolean;
  children?: React.ReactChild;
}

export function transformAppPageView(props: IAppPageProps) {
  const { content, customKey, condensed, narrow, children } = props;
  const { posterImage, key, longTitle, label } = content;

  const posterImgSrc = posterImage
    ? process.env.NEXT_PUBLIC_ASSETS_URL + posterImage.route
    : undefined;

  const wrapperClass = `hedi--simple-page ${
    key !== undefined ? `hedi--${key}-page` : ""
  } ${customKey !== undefined ? `hedi--${customKey}` : ""}`;

  const groupClass = `hedi--group hedi--group--${key}`;

  return {
    posterImgSrc,
    posterImage,
    wrapperClass,
    condensed,
    narrow,
    headline: longTitle || label,
    children,
    groupClass,
  };
}
