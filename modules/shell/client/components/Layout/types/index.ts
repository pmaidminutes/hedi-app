import { IComponent, IImageComponent, HTML } from "@/modules/components/types";
import { IPage } from "@/modules/page/types";
import { ColumnDefaultProps } from "carbon-components-react";
import React from "react";

export interface ILayout {
  sideComponents?: IComponent[];
  customKey?: string;
  condensed?: boolean;
  narrow?: boolean;
  leftColumnProps?: ColumnDefaultProps;
  rightColumnProps?: ColumnDefaultProps;
  singleColumnProps?: ColumnDefaultProps;
  pageLayout?: PageLayout;
  posterImage?: IImageComponent | null;
  pageId?: string;
  headline?: HTML | null;
}

export interface ILayoutProps extends ILayout {
  content: IPage;
  children: React.ReactNode;
  layout: ILayout;
}

export interface ILayoutBasicTemplate {
  headline: string;
  groupClass: string;
  condensed?: boolean;
  narrow?: boolean;
}

export type PageLayout = "singleColumn" | "twoColumns";
