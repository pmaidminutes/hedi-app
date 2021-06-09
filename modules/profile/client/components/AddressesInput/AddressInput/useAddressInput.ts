import { IAddressInput } from "@/modules/profile/types";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";

export const useAddressInput = (
  initialAddressInput?: Partial<IAddressInput>,
  onChange?: (addressInput: Partial<IAddressInput>) => void
) => {
  const parsers: IConverterMap<IAddressInput> = {
    dataKind: e => (e.value ? parseInt(e.value) : undefined),
    city: null,
    postalCode: e => (e.value ? parseInt(e.value) : undefined),
    cityVisibility: e => (e.value ? parseInt(e.value) : undefined),
    street: null,
    streetNumber: null,
    additionalInfo: null,
    streetVisibility: e => (e.value ? parseInt(e.value) : undefined),
  };

  return useCombinedInputs(parsers, initialAddressInput, onChange);
};
