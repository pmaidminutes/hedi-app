import {
  getButtonInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
import { IEmailsInputDefinition } from ".";
import { getEmailInputDefinition } from "./EmailInput";

export const getEmailsInputDefinition = (
  components: IComponent[]
): IEmailsInputDefinition => ({
  emailInputDefinition: getEmailInputDefinition(components),
  emailsLabel: getLabelInstance(components, "emailsLabel", {
    labelKind: "span",
    text: "Emails",
  }),
  addButton: getButtonInstance(components, "addButton", {
    buttonKind: "primary",
    usage: "",
    text: "Email hinzufügen",
  }),
  removeButton: getButtonInstance(components, "removeButton", {
    buttonKind: "primary",
    usage: "",
    text: "Email entfernen",
  }),
});
