import {
  findButtonInstance,
  findLabelInstance,
  findSelectInstance,
  IComponent,
} from "@/modules/model/components";
import { ILanguageLevelInputDefinition } from ".";

export const getLanguageLeveInputDefinition = (
  components: IComponent[]
): ILanguageLevelInputDefinition => ({
  languageTitle: findLabelInstance(components, "languageTitle")?.text,
  languageSelect: findSelectInstance(components, "languageSelect")!,
  levelTitle: findLabelInstance(components, "levelTitle")?.text,
  levelSelect: findSelectInstance(components, "levelSelect")!,
  removeButton: findButtonInstance(components, "removeButton")!,
});
