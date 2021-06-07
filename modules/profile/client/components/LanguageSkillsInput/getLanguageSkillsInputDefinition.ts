import { findButtonInstance, IComponent } from "@/modules/model/components";
import { ILanguageSkillsInputDefinition } from ".";
import { getLanguageLeveInputDefinition } from "./LanguageLevelInput";

export const getLanguageSkillsInputDefinition = (
  components: IComponent[]
): ILanguageSkillsInputDefinition => {
  const languageLevelInputDefinition = getLanguageLeveInputDefinition(
    components
  );
  return {
    languageTitle: languageLevelInputDefinition.languageTitle,
    levelTitle: languageLevelInputDefinition.levelTitle,
    languageLevelInputDefinition,
    addButton: findButtonInstance(components, "addButton")!,
  };
};
