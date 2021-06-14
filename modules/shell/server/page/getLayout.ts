import {
  findColumnInstance,
  findHeadlineLabel,
  findImageInstance,
  IColumnComponent,
  IImageComponent,
  ILabelComponent,
} from "@/modules/components/types";
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
interface ILayoutProps extends Partial<Pick<IPage, "id" | "components">> {}
export function getLayout(content: ILayoutProps & IPageConfig) {
  const { id, components, layout } = content;
  const transformedLayout: ILayout = layout || {};

  let sideColumn: IColumnComponent | undefined;
  let posterImage: IImageComponent | undefined;
  let headline: ILabelComponent | undefined;

  if (components) {
    sideColumn = findColumnInstance(components, "side");
    if (sideColumn) components.splice(components.indexOf(sideColumn), 1);

    posterImage = findImageInstance(components, "poster");
    if (posterImage) {
      components.splice(components.indexOf(posterImage), 1);
      transformedLayout["posterImage"] = posterImage;
    }

    headline = findHeadlineLabel(components);
    if (headline) {
      components.splice(components.indexOf(headline), 1);
      transformedLayout["headline"] = headline?.text;
    }
  }

  transformedLayout["pageId"] = id;

  // set pageLayout, if not allready set
  if (!transformedLayout.pageLayout) {
    // if there is a sideColumn, pageLayout will set to "twoColumns"
    // and components inside will be added to layout.sideComponents
    if (sideColumn) {
      transformedLayout["sideComponents"] = sideColumn.components;
      transformedLayout["pageLayout"] = "twoColumns";
    } else {
      transformedLayout["pageLayout"] = "singleColumn";
    }
  }

  const shell: IPageConfig = {
    layout: transformedLayout,
  };

  return { ...shell };
}
