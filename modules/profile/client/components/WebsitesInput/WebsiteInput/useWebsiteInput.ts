import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IWebsiteInput } from "../../../../types";

export const useWebsiteInput = (
  initialWebsiteInput: IWebsiteInput,
  onChange?: (websiteInput: IWebsiteInput) => void
) => {
  const parsers: IConverterMap<IWebsiteInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
    website: null,
    dataVisibility: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
  };

  return useCombinedInputs(parsers, initialWebsiteInput, onChange);
};
