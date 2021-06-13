import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IPhoneInput } from "../../../../types";

export const usePhoneInput = (
  initialPhoneInput: IPhoneInput,
  onChange?: (phoneInput: IPhoneInput) => void
) => {
  const parsers: IConverterMap<IPhoneInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
    phone: null,
    phoneKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
    dataVisibility: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
  };

  return useCombinedInputs(parsers, initialPhoneInput, onChange);
};
