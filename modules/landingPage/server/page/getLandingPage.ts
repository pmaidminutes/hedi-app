import { IAppPage } from "@/modules/common/types";
import { getLandingPageView } from "../query";
import { IPageConfig } from "@/modules/shell/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { fixupRoutes } from "../utils";

export const getLandingPage = async (
  lang: string
): Promise<(IAppPage & IPageConfig) | null> => {
  let content = await getLandingPageView(lang);

  if (!content) return null;

  content.type = "LandingPage";
  content = fixupRoutes(content);

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
  };

  return {
    ...content,
    ...shell,
  };
};
