import {
  findLabelInstance,
  findSelectInstance,
  IComponent,
} from "@/modules/model/components";
import { ILanguageLevelInputDefinition } from ".";

export const getLanguageLeveInputDefinition = (
  components: IComponent[]
): ILanguageLevelInputDefinition => ({
  languageTitle:
    findLabelInstance(components, "languageTitle")?.text ?? "Sprache",
  languageSelect: findSelectInstance(components, "languageSelect")!,
  levelTitle:
    findLabelInstance(components, "levelTitle")?.text ?? "Verständnis",
  levelSelect: findSelectInstance(components, "levelSelect")!,
});
