import {
  getButtonInstance,
  getLabelInstance,
  getSelectInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";
import { IUpsertProfessionalViewDefinition } from "./ProfileEdit";
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
  nameLabel: getLabelInstance(components, "name", {
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
  profileSaveButton: getButtonInstance(components, "profileSaveButton", {
    buttonKind: "primary",
    usage: "",
    text: "Profil speichern",
  }),
});
