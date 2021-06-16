import { IEntityLocalized, IEntityTranslated } from "@/modules/model";
import { IGlossaryTerm } from ".";

export interface IGlossaryKeyGroup extends IEntityTranslated<IEntityLocalized> {
  keyChar: string;
  terms: IGlossaryTerm[];
}
