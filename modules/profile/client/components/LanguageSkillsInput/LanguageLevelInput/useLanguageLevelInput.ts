import { ChangeEvent, useEffect, useState } from "react";
import { ILanguageLevelInput } from "@/modules/profile/types";

export const useLanguageLevelInput = (
  initiallanguageLevelInput?: ILanguageLevelInput,
  onChange?: (languageLevelInput: ILanguageLevelInput) => void
) => {
  const [languageLevelInput, setlanguageLevelInput] = useState<
    ILanguageLevelInput | undefined
  >(initiallanguageLevelInput);

  useEffect(() => {
    setlanguageLevelInput(initiallanguageLevelInput);
  }, [initiallanguageLevelInput]);

  const handleLangcodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const langcode = e.target.value;
    if (langcode) {
      setlanguageLevelInput(p => {
        const newValue = p ? { ...p, langcode } : { langcode, level: 0 };
        if (onChange) onChange(newValue);
        return newValue;
      });
    }
  };

  const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const level = parseInt(e.target.value);
    if (level) {
      setlanguageLevelInput(p => {
        const newValue = p ? { ...p, level } : { langcode: "de", level };
        if (onChange) onChange(newValue);
        return newValue;
      });
    }
  };

  return { languageLevelInput, handleLangcodeChange, handleLevelChange };
};
