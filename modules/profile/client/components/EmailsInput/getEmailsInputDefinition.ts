import {
  findButtonInstance,
  findLabelInstance,
  IComponent,
} from "@/modules/components/types";
import { IEmailsInputDefinition } from ".";
import { getEmailInputDefinition } from "./EmailInput";

export const getEmailsInputDefinition = (
  components: IComponent[]
): IEmailsInputDefinition => ({
  emailInputDefinition: getEmailInputDefinition(components),
  emailsLabel: findLabelInstance(components, "emailsLabel")!,
  addButton: findButtonInstance(components, "addButton")!,
  removeButton: findButtonInstance(components, "removeButton")!,
});
