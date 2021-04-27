import { segmentsToRoute } from "@/modules/common/utils";
import { ICategoryRoot } from "../../types";
import { getCategory, getCategoryRoot } from "../../query";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<(ICategoryRoot & IPageConfig) | null> => {
  if (!segments) {
    return null;
    // TODO how to add root to "categories"
    // return getCategoryRoot(locale);
  }
  const content = await getCategory(segmentsToRoute(segments, locale));

  if (!content) return null;

  const layout: ILayout = {
    pageLayout: "categories",
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
