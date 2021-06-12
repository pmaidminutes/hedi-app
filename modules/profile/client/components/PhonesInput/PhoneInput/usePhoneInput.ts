import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IPhoneInput } from "../../../../types";

export const usePhoneInput = (
  initialPhoneInput?: Partial<IPhoneInput>,
  onChange?: (phoneInput: Partial<IPhoneInput>) => void
) => {
  const parsers: IConverterMap<IPhoneInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
    phone: null,
    phoneKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
    dataVisibility: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
  };

  return useCombinedInputs(parsers, initialPhoneInput, onChange);
};
