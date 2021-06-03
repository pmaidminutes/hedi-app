import { IAppPage } from "@/modules/common/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getFeedbackThanksDefinition } from "../query";
import { IFeedbackThanksView } from "../../types/IFeedbackThanksView";

export const getFeedbackThanksPage = async (
  content: IAppPage
): Promise<IFeedbackThanksView & IPageConfig> => {
  content.type = "FeedbackThanks";

  const definition = await getFeedbackThanksDefinition(content);

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
    ...definition,
    ...shell,
  };
};
