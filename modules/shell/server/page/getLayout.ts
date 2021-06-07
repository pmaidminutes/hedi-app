import {
  findColumnInstance,
  findHeadlineLabel,
  findImageInstance,
} from "@/modules/model/components";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "../../../page/types";

// ************************************************
// Predefined components:
// Column with id "side":
//    - will trigger pageLayout "twoColumns"
//    - anything inside this will just rendered
// Image with id "poster":
//    - will be used as posterImage
// Label component of type "H1"
//    - will be used for the main headline in the layout
// ************************************************
export function getLayout(content: IPage & IPageConfig) {
  const { id, components } = content;
  let layout: ILayout = content.layout || {};

  const sideColumn = findColumnInstance(components, "side");
  if (sideColumn) components.splice(components.indexOf(sideColumn), 1);

  const posterImage = findImageInstance(components, "poster");
  if (posterImage) {
    components.splice(components.indexOf(posterImage), 1);
    layout["posterImage"] = posterImage;
  }

  const headline = findHeadlineLabel(components);
  if (headline) {
    components.splice(components.indexOf(headline), 1);
    layout["headline"] = headline?.text;
  }

  layout["pageId"] = id;
  if (!layout.pageLayout) {
    if (sideColumn) {
      layout["sideComponents"] = sideColumn.components;
      layout["pageLayout"] = "twoColumns";
    } else {
      layout["pageLayout"] = "singleColumn";
    }
  }

  const shell: IPageConfig = {
    layout,
  };

  return { ...shell };
}
