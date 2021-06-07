import { useEffect, useState } from "react";
import { ILanguageLevel } from "@/modules/profile/types";

function sortLanguageLevels(a: ILanguageLevel, b: ILanguageLevel) {
  return b.level - a.level;
}

export const useLanguageSkillsInput = (languageLevels?: ILanguageLevel[]) => {
  const [languageLevelInputs, setLanguageLevelInputs] = useState(
    languageLevels?.sort(sortLanguageLevels) ?? []
  );

  useEffect(() => {
    setLanguageLevelInputs(languageLevels?.sort(sortLanguageLevels) ?? []);
  }, [languageLevels]);

  const handleAddClick = () => {
    setLanguageLevelInputs(p => [...p, { langcode: "de", level: 0 }]);
  };

  const handleRemoveClick = (i: number) => {
    setLanguageLevelInputs(p => {
      p.splice(i, 1);
      return [...p];
    });
  };

  const handleItemChange = (i: number, languageLevel: ILanguageLevel) => {
    setLanguageLevelInputs(previous => {
      previous[i] = languageLevel;
      return [...previous];
    });
  };

  return {
    languageLevelInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  };
};
