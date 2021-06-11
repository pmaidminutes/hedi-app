import {
  findLabelInstance,
  findSelectInstance,
  findTextInputInstance,
  IComponent,
} from "@/modules/components";
import { IWebsiteInputProps } from "./WebsiteInput";

export const getWebsiteInputDefinition = (
  components: IComponent[]
): IWebsiteInputProps => ({
  websiteLabel: findLabelInstance(components, "websiteLabel")!,
  dataKindSelect: findSelectInstance(components, "dataKindSelect")!,
  websiteTextInput: findTextInputInstance(components, "websiteTextInput")!,
  dataVisibilitySelect: findSelectInstance(components, "dataVisibilitySelect")!,
});
