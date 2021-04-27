import { segmentsToRoute } from "@/modules/common/utils";
import { IArticle } from "../../types";
import { getArticle } from "../../query";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<(IArticle & IPageConfig) | null> => {
  if (!segments) {
    return null;
  }
  const content = await getArticle(segmentsToRoute(segments, locale));

  if (!content) return null;

  const layout: ILayout = {
    pageLayout: "editorial",
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
