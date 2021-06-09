import { IPhoneInput } from "@/modules/profile/types";
import { useCombinedInputs, IConverterMap } from "@/modules/react/hooks";

export const usePhoneInput = (
  initialPhoneInput?: Partial<IPhoneInput>,
  onChange?: (phoneInput: Partial<IPhoneInput>) => void
) => {
  const parsers: IConverterMap<IPhoneInput> = {
    dataKind: e => (e.value ? parseInt(e.value) : undefined),
    phone: null,
    phoneKind: e => (e.value ? parseInt(e.value) : undefined),
    dataVisibility: e => (e.value ? parseInt(e.value) : undefined),
  };

  return useCombinedInputs(parsers, initialPhoneInput, onChange);
};
