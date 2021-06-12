import { ChangeEvent } from "react";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";
import { IAddressInput } from "../../../../types";

export const useAddressInput = (
  initialAddressInput?: Partial<IAddressInput>,
  onChange?: (addressInput: Partial<IAddressInput>) => void
) => {
  const parsers: IConverterMap<IAddressInput> = {
    dataKind: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
    city: null,
    postalCode: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
    cityVisibility: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
    street: null,
    streetNumber: null,
    additionalInfo: null,
    streetVisibility: (e: ChangeEvent<HTMLSelectElement>) =>
      e.target.value ? parseInt(e.target.value) : undefined,
  };

  return useCombinedInputs(parsers, initialAddressInput, onChange);
};
