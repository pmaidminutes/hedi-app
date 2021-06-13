import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IAddressInput } from "../../../../types";

export const useAddressInput = (
  initialAddressInput: IAddressInput,
  onChange?: (addressInput: IAddressInput) => void
) => {
  const parsers: IConverterMap<IAddressInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
    city: null,
    postalCode: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
    cityVisibility: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
    street: null,
    streetNumber: null,
    additionalInfo: null,
    streetVisibility: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : 0,
  };

  return useCombinedInputs(parsers, initialAddressInput, onChange);
};
