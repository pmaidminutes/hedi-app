import {
  getButtonInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { IPhonesInputDefinition } from ".";
import { getPhoneInputDefinition } from "./PhoneInput";

export const getPhonesInputDefinition = (
  components: IComponent[]
): IPhonesInputDefinition => ({
  phoneInputDefinition: getPhoneInputDefinition(components),
  phonesLabel: getLabelInstance(components, "phonesLabel", {
    labelKind: "span",
    text: "Telefonnummern",
  }),
  addButton: getButtonInstance(components, "addButton", {
    buttonKind: "primary",
    usage: "",
    text: "Telefonnummer hinzufügen",
  }),
  removeButton: getButtonInstance(components, "removeButton", {
    buttonKind: "primary",
    usage: "",
    text: "Telefonnummer entfernen",
  }),
});
