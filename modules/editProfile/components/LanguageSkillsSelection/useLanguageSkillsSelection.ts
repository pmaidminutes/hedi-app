import { useEffect, useState } from "react";
import { ILanguageSkillEntry } from "../../types";

export const useLanguageSkillsSelection = (data?: ILanguageSkillEntry[]) => {
  const [languageSkillEntries, setLanguageSkillEntries] = useState(data ?? []);
  const [isMobileContext, setIsMobileContext] = useState(false);

  useEffect(() => {
    setLanguageSkillEntries(data?.sort((a, b) => b.level - a.level) ?? []);
  }, [data]);

  const handleAddClick = () => {
    setLanguageSkillEntries(p => [...p, { langcode: "en", level: 5 }]);
  };

  const handleRemoveClick = (i: number) => {
    setLanguageSkillEntries(p => {
      p.splice(i, 1);
      return [...p].sort((a, b) => b.level - a.level);
    });
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (!isMobileContext && width < 768) {
      setIsMobileContext(true);
    } else if (isMobileContext && width > 768) {
      setIsMobileContext(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined")
      window.addEventListener("resize", handleResize);
  });

  return {
    isMobileContext,
    languageSkillEntries,
    handleAddClick,
    handleRemoveClick,
  };
};
