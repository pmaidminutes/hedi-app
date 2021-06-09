import {
  findLabelInstance,
  findSelectInstance,
  findTextInputInstance,
  IComponent,
} from "@/modules/model/components";
import { IEmailInputProps } from "./EmailInput";

export const getEmailInputDefinition = (
  components: IComponent[]
): IEmailInputProps => ({
  emailLabel: findLabelInstance(components, "emailLabel")!,
  dataKindSelect: findSelectInstance(components, "dataKindSelect")!,
  emailTextInput: findTextInputInstance(components, "emailTextInput")!,
  dataVisibilitySelect: findSelectInstance(components, "dataVisibilitySelect")!,
});
