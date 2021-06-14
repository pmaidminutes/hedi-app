import { IPage } from "@/modules/page/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getGlossaryContent } from "../../query";
import { glossaryToGroupedGlossary } from "../../query/functions";
import { IGlossaryGroup } from "../../types";

export async function getGlossaryPage(
  content: IPage
): Promise<IGlossaryGroup & IPageConfig> {
  content.type = "Glossary";
  const glossaryEntityWithTerms = await getGlossaryContent(content.route);
  const glossaryGroup = await glossaryToGroupedGlossary(
    glossaryEntityWithTerms
  );
  const layout: ILayout = {
    pageLayout: "singleColumn",
  };

  const shell: IPageConfig = {
    useHeader: "AUTHORIZED",
    layout,
  };

  return {
    ...content,
    keyGroups: glossaryGroup,
    ...shell,
  };
}
