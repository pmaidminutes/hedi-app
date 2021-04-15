import { IAppPage } from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import {
  ILayout,
  ILayoutProps,
} from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getEditProfile } from "../../query";

export const getStaticProps = async (
  segments?: string[],
  locale = "de"
): Promise<(IAppPage & IPageConfig) | null> => {
  if (!segments) {
    return null;
  } else {
    const content = await getEditProfile(segmentsToRoute(segments, locale));
    if (!content) return null;

    const layout: ILayout = {
      pageLayout: "singleColumn",
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
  }
};
