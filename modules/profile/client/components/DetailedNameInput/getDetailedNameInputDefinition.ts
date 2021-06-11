import {
  getLabelInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";
import { IDetailedNameInputDefinition } from ".";

export const getDetailedNameInputDefinition = (
  components: IComponent[]
): IDetailedNameInputDefinition => ({
  detailedNameLabel: getLabelInstance(components, "detailedNameLabel", {
    labelKind: "span",
    text: "Name",
  }),
  prefixTextInput: getTextInputInstance(components, "prefixTextInput", {
    type: "text",
    labelText: "Prefix",
  }),
  givenNameTextInput: getTextInputInstance(components, "givenNameTextInput", {
    type: "text",
    labelText: "Vorname",
  }),
  familyNameTextInput: getTextInputInstance(components, "familyNameTextInput", {
    type: "text",
    labelText: "Nachname",
  }),
});
