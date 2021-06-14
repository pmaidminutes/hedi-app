import { IEntityLocalized, IEntityTranslated } from "@/modules/model";
import { IPage } from "@/modules/page/types";
import { IGlossaryKeyGroup } from ".";

export interface IGlossaryGroup
  extends IPage,
    IEntityTranslated<IEntityLocalized> {
  keyGroups: IGlossaryKeyGroup[];
}
export function isIGlossaryGroup(obj: any): obj is IGlossaryGroup {
  return obj && obj.type === "Glossary";
}
