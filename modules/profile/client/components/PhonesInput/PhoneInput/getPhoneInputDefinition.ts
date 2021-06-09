import {
  findLabelInstance,
  findSelectInstance,
  findTextInputInstance,
  IComponent,
} from "@/modules/model/components";
import { IPhoneInputProps } from "./PhoneInput";

export const getPhoneInputDefinition = (
  components: IComponent[]
): IPhoneInputProps => ({
  phoneLabel: findLabelInstance(components, "phoneLabel")!,
  dataKindSelect: findSelectInstance(components, "dataKindSelect")!,
  phoneTextInput: findTextInputInstance(components, "phoneTextInput")!,
  phoneKindSelect: findSelectInstance(components, "phoneKindSelect")!,
  dataVisibilitySelect: findSelectInstance(components, "dataVisibilitySelect")!,
});
