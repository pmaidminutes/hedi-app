import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getGlossaryDefinition } from "../../query";
import { IGlossary, IGlossaryGrouped } from "../../types";

export async function getGlossaryPage(
  content: IGlossary
): Promise<IGlossaryGrouped & IPageConfig> {
  const components = await getGlossaryDefinition(content.route);
  // if (!components) return null;

  const layout: ILayout = {
    pageLayout: "singleColumn",
  };

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    layout,
  };

  return {
    ...components,
    ...shell,
  };
}
