import { IConverterMap, useCombinedInputs } from "@/modules/react/hooks";
import { ILanguageLevelInput } from "../../../../types";

export const useLanguageLevelInput = (
  initiallanguageLevelInput?: Partial<ILanguageLevelInput>,
  onChange?: (languageLevelInput: Partial<ILanguageLevelInput>) => void
) => {
  const parsers: IConverterMap<ILanguageLevelInput> = {
    langcode: null,
    level: e => (e.value ? parseInt(e.value) : undefined),
  };

  return useCombinedInputs(parsers, initiallanguageLevelInput, onChange);
};
