import { IPage } from "@/modules/page/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getGlossaryContent } from "../../query";
import { glossaryTermsToGlossaryKeyGroup } from "../../query/functions";
import { IGlossaryKeyGroup } from "../../types";

export type IGlossaryPage = IPage & {
  glossaryKeyGroups: IGlossaryKeyGroup[];
};
export async function getGlossaryPage(
  content: IPage
): Promise<IGlossaryPage & IPageConfig> {
  content.type = "Glossary";
  const glossaryEntityWithTerms = await getGlossaryContent(content.route);
  const glossaryKeyGroups = await glossaryTermsToGlossaryKeyGroup(
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
    glossaryKeyGroups: glossaryKeyGroups,
    ...shell,
  };
}
