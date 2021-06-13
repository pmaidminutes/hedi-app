import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IEmailInput } from "../../../../types";

export const useEmailInput = (
  initialEmailInput: Partial<IEmailInput>,
  onChange?: (emailInput: Partial<IEmailInput>) => void
) => {
  const parsers: IConverterMap<IEmailInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
    email: null,
    dataVisibility: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
  };

  return useCombinedInputs(parsers, initialEmailInput, onChange);
};
