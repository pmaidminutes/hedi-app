import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getGlossary } from "../../query";
import { IGlossaryGrouped } from "../../types";

export async function getGlossaryPage(
  route: string
): Promise<(IGlossaryGrouped & IPageConfig) | null> {
  const content = await getGlossary(route);
  if (!content) return null;

  const layout: ILayout = {
    pageLayout: "singleColumn",
  };

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    layout,
  };

  return {
    ...content,
    ...shell,
  };
}
