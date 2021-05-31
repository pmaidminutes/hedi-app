import { IAppPage } from "@/modules/common/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getUserFeedbackThanksDefinition } from "../query";
import { IUserFeedbackThanksView } from "../../types/IUserFeedbackThanksView";

export const getUserFeedbackThanksPage = async (
  content: IAppPage
): Promise<IUserFeedbackThanksView & IPageConfig> => {
  content.type = "UserFeedbackThanks";

  const definition = await getUserFeedbackThanksDefinition(content);

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
