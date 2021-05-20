import {
  findGroupInstance,
  findImageInstance,
  isImage,
} from "@/modules/model/components";
import {
  ILayout,
  ILayoutImage,
} from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "../../types";
import { getPage } from "../query";

export const getPagePage = async (
  route: string
): Promise<(IPage & IPageConfig) | null> => {
  const content = await getPage(route);

  if (!content) return null;

  const { components, id } = content;

  const sideColumn = findGroupInstance(components, "side");
  const posterImage = findImageInstance(components, "poster");

  const layout: ILayout = {
    posterImage,
    pageId: id,
  };
  if (sideColumn) {
    const sideImage = sideColumn.components.find(isImage);
    const layoutImg: ILayoutImage = {
      alt: sideImage?.alt ?? "",
      src: `${process.env.NEXT_PUBLIC_ASSETS_URL}${sideImage?.route ?? ""}`,
    };
    layout["pageLayout"] = "imageAndColumn";
    layout["layoutImg"] = layoutImg;
  } else {
    layout["pageLayout"] = "singleColumn";
  }

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    layout,
  };
  return {
    ...content,
    ...shell,
  };
};
