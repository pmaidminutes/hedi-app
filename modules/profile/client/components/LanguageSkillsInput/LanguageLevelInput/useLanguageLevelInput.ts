import { ChangeEvent } from "react";
import { IConverterMap, useCombinedInputs } from "@/modules/react/hooks";
import { ILanguageLevelInput } from "../../../../types";

export const useLanguageLevelInput = (
  initiallanguageLevelInput?: Partial<ILanguageLevelInput>,
  onChange?: (languageLevelInput: Partial<ILanguageLevelInput>) => void
) => {
  const parsers: IConverterMap<ILanguageLevelInput> = {
    langcode: null,
    level: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
  };

  return useCombinedInputs(parsers, initiallanguageLevelInput, onChange);
};
