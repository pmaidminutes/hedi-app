import { segmentsToRoute } from "@/modules/common/utils";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getUserFeedbackThanksView } from "../../query";
import { IUserFeedbackThanksView } from "../../types/IUserFeedbackThanksView";

export const getUserFeedbackThanksPage = async (
  route: string
): Promise<(IUserFeedbackThanksView & IPageConfig) | null> => {
  const content = await getUserFeedbackThanksView(route);

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
    redirectUnAuthorized: "/" + content.lang,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
