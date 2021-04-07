import { useEffect, useState } from "react";
import { ILanguageSkillEntry } from "../../../types";

export const useLanguageSkillsSelection = (data?: ILanguageSkillEntry[]) => {
  const [languageSkillEntries, setLanguageSkillEntries] = useState(data ?? []);

  useEffect(() => {
    setLanguageSkillEntries(data?.sort((a, b) => b.level - a.level) ?? []);
  }, [data]);

  const handleAddClick = () => {
    setLanguageSkillEntries(p => [...p, { langcode: "en", level: 0 }]);
  };

  const handleRemoveClick = (i: number) => {
    setLanguageSkillEntries(p => {
      p.splice(i, 1);
      return [...p].sort((a, b) => b.level - a.level);
    });
  };

  return {
    languageSkillEntries,
    handleAddClick,
    handleRemoveClick,
  };
};
