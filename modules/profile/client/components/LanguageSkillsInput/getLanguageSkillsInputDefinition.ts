import {
  findButtonInstance,
  findLabelInstance,
  IComponent,
} from "@/modules/model/components";
import { ILanguageSkillsInputDefinition } from ".";
import { getLanguageLeveInputDefinition } from "./LanguageLevelInput";

export const getLanguageSkillsInputDefinition = (
  components: IComponent[]
): ILanguageSkillsInputDefinition => {
  const languageLevelInputDefinition = getLanguageLeveInputDefinition(
    components
  );
  return {
    languageSkillsLabel: findLabelInstance(components, "languageSkillsLabel")!,
    languageTitle: languageLevelInputDefinition.languageTitle,
    levelTitle: languageLevelInputDefinition.levelTitle,
    languageLevelInputDefinition,
    addButton: findButtonInstance(components, "addButton")!,
    removeButton: findButtonInstance(components, "removeButton")!,
  };
};
