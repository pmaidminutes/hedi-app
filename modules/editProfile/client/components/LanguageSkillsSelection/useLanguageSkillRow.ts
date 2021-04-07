import { ILanguage } from "@/modules/model";
import { OnChangeData } from "carbon-components-react";
import { useEffect, useState } from "react";
import { ILanguageSkillEntry } from "../../../types";

export const useLanguageSkillRow = (data: ILanguageSkillEntry) => {
  const [languageSkill, setLanguageSkill] = useState(data);

  useEffect(() => {
    setLanguageSkill(data);
  }, [data]);

  const handleLanguageChange = (e: OnChangeData<ILanguage>) => {
    const language = e.selectedItem;
    if (language) setLanguageSkill(p => ({ ...p, langcode: language.code }));
  };

  const handleLevelChange = (e: OnChangeData<number>) => {
    const level = e.selectedItem;
    if (typeof level === "number") setLanguageSkill(p => ({ ...p, level }));
  };

  return { languageSkill, handleLanguageChange, handleLevelChange };
};
