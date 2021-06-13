import { ChangeEvent } from "react";
import { IConverterMap, useCombinedInputs } from "@/modules/react/hooks";
import { ILanguageLevelInput } from "../../../../types";

export const useLanguageLevelInput = (
  initialLanguageLevelInput: ILanguageLevelInput,
  onChange?: (languageLevelInput: ILanguageLevelInput) => void
) => {
  const parsers: IConverterMap<ILanguageLevelInput> = {
    langcode: null,
    level: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
  };

  return useCombinedInputs(parsers, initialLanguageLevelInput, onChange);
};
