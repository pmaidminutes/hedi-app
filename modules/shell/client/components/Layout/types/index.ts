import { IComponent, IImageComponent, HTML } from "@/modules/components/types";
import { IImage } from "@/modules/editorial/types";
import { IPage } from "@/modules/page/types";
import { ColumnDefaultProps } from "carbon-components-react";
import React from "react";
import { IBreadCrumbProps } from "../../BreadCrumb/transformBreadCrumb";

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
  breadcrumbs?: IBreadCrumbProps;
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

export type PageLayout = "singleColumn" | "twoColumns" | "editorial";
