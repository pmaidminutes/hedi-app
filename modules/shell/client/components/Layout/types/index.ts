import { IAppPage } from "@/modules/common/types";
import { ColumnDefaultProps } from "carbon-components-react";
import React from "react";

export interface ILayout {
  layoutImg?: ILayoutImage;
  customKey?: string;
  condensed?: boolean;
  narrow?: boolean;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  singleColumnProps?: ColumnDefaultProps;
  pageLayout?: PageLayout;
}

export interface ILayoutImage {
  src?: string;
  alt?: string;
}
export interface ILayoutProps extends ILayout {
  content: IAppPage;
  children: React.ReactNode;
  layout: ILayout;
}

export interface ILayoutBasicTemplate {
  headline: string;
  body: string;
  groupClass: string;
  condensed?: boolean;
  narrow?: boolean;
}

export type PageLayout = "singleColumn" | "imageAndColumn";
