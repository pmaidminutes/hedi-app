import { ChangeEvent } from "react";
import { IConverterMap, useCombinedInputs } from "@/modules/react/hooks";
import {
  ILanguageLevelInput,
  LanguageLevelInputDefault,
} from "../../../../types";

export const useLanguageLevelInput = (
  initialValue?: ILanguageLevelInput,
  defaultValue = LanguageLevelInputDefault,
  onChange?: (languageLevelInput: ILanguageLevelInput) => void
) => {
  const parsers: IConverterMap<ILanguageLevelInput> = {
    langcode: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ?? defaultValue.langcode,
    level: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : defaultValue.level,
  };

  return useCombinedInputs(parsers, initialValue ?? defaultValue, onChange);
};
