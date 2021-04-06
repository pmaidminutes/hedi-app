import { AssertClientSide } from "@/modules/common/utils";
import { useEffect, useState } from "react";
import { ILanguageSkillEntry } from "../../types";

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

  const handleResize = () => {
    const width = window.innerWidth;
    if (!isMobileContext && width < 768) {
      setIsMobileContext(true);
    } else if (isMobileContext && width > 768) {
      setIsMobileContext(false);
    }
  };

  useEffect(() => {
    if (AssertClientSide()) window.addEventListener("resize", handleResize);
  });

  return {
    isMobileContext,
    languageSkillEntries,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  };
};
