import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IEmailInput } from "../../../../types";

export const useEmailInput = (
  initialEmailInput?: Partial<IEmailInput>,
  onChange?: (emailInput: Partial<IEmailInput>) => void
) => {
  const parsers: IConverterMap<IEmailInput> = {
    dataKind: e => (e.value ? parseInt(e.value) : undefined),
    email: null,
    dataVisibility: e => (e.value ? parseInt(e.value) : undefined),
  };

  return useCombinedInputs(parsers, initialEmailInput, onChange);
};
