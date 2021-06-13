import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IEmailInput } from "../../../../types";

export const useEmailInput = (
  initialEmailInput: IEmailInput,
  onChange?: (emailInput: IEmailInput) => void
) => {
  const parsers: IConverterMap<IEmailInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
    email: null,
    dataVisibility: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
  };

  return useCombinedInputs(parsers, initialEmailInput, onChange);
};
