import { segmentsToRoute } from "@/modules/common/utils";
import { ILayout, ILayoutProps } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getProfileListView, ProfileListView } from "../../query";

export const getProfileListPage = async (
  segments?: string[],
  locale = "de"
): Promise<(ProfileListView & IPageConfig) | null> => {
  if (!segments) return null;

  const content = await getProfileListView(segmentsToRoute(segments, locale));
  if (!content) return null;

  const layout: ILayout = {
    pageLayout: "singleColumn",
    customKey: "profile-list",
  };

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    redirectUnAuthorized: "/" + content.lang,
    revalidate: 1,
    layout,
  };

  return {
    ...content,
    ...shell,
  };
};
