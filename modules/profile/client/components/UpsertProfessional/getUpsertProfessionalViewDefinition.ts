import {
  getLabelInstance,
  getSelectInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";
import { IUpsertProfessionalViewDefinition } from "./UpsertProfessional";
import {
  getAddressesInputDefinition,
  getConsultationHoursInputDefinition,
  getEmailsInputDefinition,
  getLanguageSkillsInputDefinition,
  getPhonesInputDefinition,
  getWebsitesInputDefinition,
} from "..";

export const getUpsertProfessionalViewDefinition = (
  components: IComponent[]
): IUpsertProfessionalViewDefinition => ({
  professionSelect: getSelectInstance(components, "professionSelect", {
    items: [],
  }),
  nameLabel: getLabelInstance(components, "nameLabel", {
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
  addressesInputDefinition: getAddressesInputDefinition(components),
  phonesInputDefinition: getPhonesInputDefinition(components),
  emailsInputDefinition: getEmailsInputDefinition(components),
  websitesInputDefinition: getWebsitesInputDefinition(components),
  languageSkillsInputDefinition: getLanguageSkillsInputDefinition(components),
  consultationHoursInputDefinition: getConsultationHoursInputDefinition(
    components
  ),
});
