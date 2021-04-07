import { ILanguage } from "@/modules/model";
import { OnChangeData } from "carbon-components-react";
import { useEffect, useState } from "react";
import { ILanguageSkillEntry } from "../../../types";

export const useLanguageSkillRow = (
  data: ILanguageSkillEntry,
  onChange?: (data: ILanguageSkillEntry) => void
) => {
  const [languageSkill, setLanguageSkill] = useState(data);

  useEffect(() => {
    setLanguageSkill(data);
  }, [data]);

  const handleLanguageChange = (e: OnChangeData<ILanguage>) => {
    const language = e.selectedItem;
    if (language) {
      setLanguageSkill(p => {
        const newValue = { ...p, langcode: language.code };
        if (onChange) onChange(newValue);
        return newValue;
      });
    }
  };

  const handleLevelChange = (e: OnChangeData<number>) => {
    const level = e.selectedItem;
    if (typeof level === "number") {
      setLanguageSkill(p => {
        const newValue = { ...p, level };
        if (onChange) onChange(newValue);
        return newValue;
      });
    }
  };

  return { languageSkill, handleLanguageChange, handleLevelChange };
};
