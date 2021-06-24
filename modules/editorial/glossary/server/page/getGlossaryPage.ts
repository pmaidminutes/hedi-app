import { IPage } from "@/modules/page/types";
import { ILayout } from "@/modules/shell/client/components/Layout/types";
import { IPageConfig } from "@/modules/shell/types";
import { getGlossaryContent } from "../../query";
import { glossaryTermsToGlossaryKeyGroup } from "../../query/functions";
import { getGlossaryDefinition } from "../../query/getGlossaryDefinition";
import { IGlossaryKeyGroup, IGlossaryTerm } from "../../types";

export type IGlossaryPage = IPage & {
  glossaryKeyGroups: IGlossaryKeyGroup[];
};

export async function getGlossaryPage(
  content: Omit<IGlossaryTerm, "body">
): Promise<IGlossaryPage & IPageConfig> {
  const lang = content.lang;
  const glossaryEntityWithTerms = await getGlossaryContent(lang);
  const glossaryKeyGroups = await glossaryTermsToGlossaryKeyGroup(
    glossaryEntityWithTerms
  );

  const glossaryContent = await getGlossaryDefinition(lang);

  glossaryContent.type = "Glossary";
  const layout: ILayout = {
    pageLayout: "singleColumn",
  };
  //const shell = getLayout(content);
  const shell: IPageConfig = {
    useHeader: true,
    layout,
  };

  return {
    ...glossaryContent,
    glossaryKeyGroups: glossaryKeyGroups,
    ...shell,
  };
}
