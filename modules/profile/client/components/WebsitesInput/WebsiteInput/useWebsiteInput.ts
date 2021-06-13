import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IWebsiteInput } from "../../../../types";

export const useWebsiteInput = (
  initialWebsiteInput: Partial<IWebsiteInput>,
  onChange?: (websiteInput: Partial<IWebsiteInput>) => void
) => {
  const parsers: IConverterMap<IWebsiteInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
    website: null,
    dataVisibility: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
  };

  return useCombinedInputs(parsers, initialWebsiteInput, onChange);
};
