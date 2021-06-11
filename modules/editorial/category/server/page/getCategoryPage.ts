import { ICategory } from "../../types";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { imageToImageComponent } from "@/modules/components/types";

export const getCategoryPage = async (
  content: ICategory
): Promise<ICategory & IPageConfig> => {
  const layout: ILayout = {
    pageLayout: "editorial",
    posterImage: imageToImageComponent(content.image) || null,
    breadcrumbs: { ...content },
  };
  const shell: IPageConfig = {
    useHeader: true,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
