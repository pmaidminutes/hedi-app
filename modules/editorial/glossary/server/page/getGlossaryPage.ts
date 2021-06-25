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
  const lang = content.lang;
  const glossaryEntityWithTerms = await getGlossaryContent(lang);
  const glossaryKeyGroups = await glossaryTermsToGlossaryKeyGroup(
    glossaryEntityWithTerms
  );

  content.type = "Glossary";
  const layout: ILayout = {
    pageLayout: "singleColumn",
  };
  const shell: IPageConfig = {
    useHeader: true,
    layout,
  };

  return {
    ...content,
    glossaryKeyGroups: glossaryKeyGroups,
    ...shell,
  };
}
