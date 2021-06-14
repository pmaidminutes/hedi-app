import {
  getButtonInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { ILanguageSkillsInputDefinition } from ".";
import { getLanguageLeveInputDefinition } from "./LanguageLevelInput";

export const getLanguageSkillsInputDefinition = (
  components: IComponent[]
): ILanguageSkillsInputDefinition => {
  const languageLevelInputDefinition = getLanguageLeveInputDefinition(
    components
  );
  return {
    languageSkillsLabel: getLabelInstance(components, "languageSkills", {
      labelKind: "span",
      text: "Sprachverständnis",
    }),
    languageTitle: languageLevelInputDefinition.languageTitle,
    levelTitle: languageLevelInputDefinition.levelTitle,
    languageLevelInputDefinition,
    addButton: getButtonInstance(components, "languageLevelAddButton", {
      buttonKind: "primary",
      usage: "",
      text: "Sprache hinzufügen",
    }),
    removeButton: getButtonInstance(components, "languageLevelRemoveButton", {
      buttonKind: "ghost",
      usage: "",
      text: "Sprache entfernen",
    }),
  };
};
