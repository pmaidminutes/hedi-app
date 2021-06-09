import {
  findButtonInstance,
  findLabelInstance,
  IComponent,
} from "@/modules/model/components";
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
