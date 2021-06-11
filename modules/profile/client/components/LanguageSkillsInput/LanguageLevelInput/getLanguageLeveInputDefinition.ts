import {
  findLabelInstance,
  getSelectInstance,
  IComponent,
} from "@/modules/components";
import { ILanguageLevelInputDefinition } from ".";

export const getLanguageLeveInputDefinition = (
  components: IComponent[]
): ILanguageLevelInputDefinition => ({
  languageTitle:
    findLabelInstance(components, "languageTitle")?.text ?? "Sprache",
  languageSelect: getSelectInstance(components, "languageSelect", {
    items: [],
  }),
  levelTitle:
    findLabelInstance(components, "levelTitle")?.text ?? "Verständnis",
  levelSelect: getSelectInstance(components, "levelSelect", { items: [] }),
});
