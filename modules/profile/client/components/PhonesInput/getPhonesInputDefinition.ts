import {
  findButtonInstance,
  findLabelInstance,
  IComponent,
} from "@/modules/components/types";
import { IPhonesInputDefinition } from ".";
import { getPhoneInputDefinition } from "./PhoneInput";

export const getPhonesInputDefinition = (
  components: IComponent[]
): IPhonesInputDefinition => ({
  phoneInputDefinition: getPhoneInputDefinition(components),
  phonesLabel: findLabelInstance(components, "phonesLabel")!,
  addButton: findButtonInstance(components, "addButton")!,
  removeButton: findButtonInstance(components, "removeButton")!,
});
