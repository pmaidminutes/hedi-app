import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getUserFeedbackThanksView } from "../../query";
import { IUserFeedbackThanksView } from "../../types/IUserFeedbackThanksView";

export const getUserFeedbackThanksPage = async (
  segments?: string[],
  locale = "de"
): Promise<(IUserFeedbackThanksView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getUserFeedbackThanksView(
    segmentsToRoute(segments, locale)
  );
  if (!content) return null;
  const layoutImg = {
    src: `${process.env.NEXT_PUBLIC_IMG_HEADER_SIMPLE}`,
    alt: "Some description",
  };

  const layout: ILayout = {
    pageLayout: "imageAndColumn",
    layoutImg,
  };
  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + locale,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
