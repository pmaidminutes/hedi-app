import {
  findLabelInstance,
  findNumberInputInstance,
  findSelectInstance,
  findTextInputInstance,
  IComponent,
} from "@/modules/components";
import { IAddressInputProps } from "./AddressInput";

export const getAddressInputDefinition = (
  components: IComponent[]
): IAddressInputProps => ({
  addressLabel: findLabelInstance(components, "addressLabel")!,
  dataKindSelect: findSelectInstance(components, "dataKindSelect")!,
  cityTextInput: findTextInputInstance(components, "cityTextInput")!,
  postalCodeNumberInput: findNumberInputInstance(
    components,
    "postalCodeNumberInput"
  )!,
  cityVisibilitySelect: findSelectInstance(components, "cityVisibilitySelect")!,
  streetTextInput: findTextInputInstance(components, "streetTextInput")!,
  streetNumberTextInput: findTextInputInstance(
    components,
    "streetNumberTextInput"
  )!,
  additionalInfoTextInput: findTextInputInstance(
    components,
    "additionalInfoTextInput"
  )!,
  streetVisibilitySelect: findSelectInstance(
    components,
    "streetVisibilitySelect"
  )!,
});
