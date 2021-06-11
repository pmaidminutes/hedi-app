import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IWebsiteInput } from "../../../../types";

export const useWebsiteInput = (
  initialWebsiteInput?: Partial<IWebsiteInput>,
  onChange?: (websiteInput: Partial<IWebsiteInput>) => void
) => {
  const parsers: IConverterMap<IWebsiteInput> = {
    dataKind: e => (e.value ? parseInt(e.value) : undefined),
    website: null,
    dataVisibility: e => (e.value ? parseInt(e.value) : undefined),
  };

  return useCombinedInputs(parsers, initialWebsiteInput, onChange);
};
