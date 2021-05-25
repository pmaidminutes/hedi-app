import {
  findColumnInstance,
  findImageInstance,
  isImage,
} from "@/modules/model/components";
import {
  ILayout,
  ILayoutImage,
} from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "../../types";

export function getLayout(content: IPage & IPageConfig) {
  const { id, components } = content;

  const sideColumn = findColumnInstance(components, "side");
  const posterImage = findImageInstance(components, "poster") || null;

  let layout: ILayout = content.layout || {};

  layout["posterImage"] = posterImage;
  layout["pageId"] = id;
  if (!layout.pageLayout) {
    if (sideColumn) {
      const sideImage = sideColumn.components?.find(isImage) || null;
      if (sideImage) {
        const layoutImg: ILayoutImage = {
          alt: sideImage?.alt ?? "",
          src: `${process.env.NEXT_PUBLIC_ASSETS_URL}${sideImage?.route ?? ""}`,
        };
        layout["layoutImg"] = layoutImg;
      }
      layout["pageLayout"] = "imageAndColumn";
    } else {
      layout["pageLayout"] = "singleColumn";
    }
  }

  const shell: IPageConfig = {
    layout,
  };

  return { ...shell };
}
