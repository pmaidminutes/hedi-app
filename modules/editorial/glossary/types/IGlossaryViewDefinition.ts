import { IPage } from "@/modules/page/types";
import { IGlossaryKeyGroup } from ".";

export interface IGlossaryViewDefinition extends IPage {
  glossaryKeyGroups: IGlossaryKeyGroup[];
}
