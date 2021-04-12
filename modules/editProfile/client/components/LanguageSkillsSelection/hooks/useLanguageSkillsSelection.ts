import { ILanguageSkillEntry } from "@/modules/editProfile/types";
import { useEffect, useState } from "react";

export const useLanguageSkillsSelection = (data?: ILanguageSkillEntry[]) => {
  const [languageSkillEntries, setLanguageSkillEntries] = useState(
    data?.sort((a, b) => b.level - a.level) ?? []
  );
  const [isMobileContext, setIsMobileContext] = useState(false);

  useEffect(() => {
    setLanguageSkillEntries(data ?? []);
  }, [data]);

  const handleAddClick = () => {
    setLanguageSkillEntries(p => [...p, { langcode: "en", level: 0 }]);
  };

  const handleRemoveClick = (i: number) => {
    setLanguageSkillEntries(p => {
      p.splice(i, 1);
      return [...p];
    });
  };

  const handleItemChange = (i: number, data: ILanguageSkillEntry) => {
    setLanguageSkillEntries(previous => {
      previous[i] = data;
      return [...previous];
    });
  };

  return {
    languageSkillEntries,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  };
};
